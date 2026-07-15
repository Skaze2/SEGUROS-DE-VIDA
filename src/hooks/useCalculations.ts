import { useCallback, useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { toast } from 'sonner'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import type { Calculation } from '@/types/calculadora'

/** Datos de un cálculo sin los campos que administra Firestore. */
export type CalculationDraft = Omit<Calculation, 'id' | 'createdAt' | 'updatedAt'>

export function useCalculations() {
  const { user } = useAuth()
  const uid = user?.uid
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) {
      setCalculations([])
      setLoading(false)
      return
    }

    setLoading(true)
    const ref = collection(db, 'users', uid, 'calculations')
    return onSnapshot(
      query(ref, orderBy('updatedAt', 'desc')),
      (snapshot) => {
        const items: Calculation[] = []
        for (const d of snapshot.docs) {
          const data = d.data()
          // Un doc malformado (editado a mano, versión vieja) no debe tumbar la app
          if (
            typeof data.title !== 'string' ||
            !Array.isArray(data.members) ||
            typeof data.householdSize !== 'number' ||
            typeof data.totalIncome !== 'number' ||
            typeof data.fplPercent !== 'number'
          ) {
            console.warn('Cálculo con formato inesperado ignorado:', d.id)
            continue
          }
          items.push({
            id: d.id,
            title: data.title,
            members: data.members,
            householdSize: data.householdSize,
            totalIncome: data.totalIncome,
            fplPercent: data.fplPercent,
            fplYear: typeof data.fplYear === 'number' ? data.fplYear : 0,
            ...(typeof data.stateAbbr === 'string' && data.stateAbbr
              ? { stateAbbr: data.stateAbbr }
              : {}),
            createdAt: data.createdAt ?? null,
            updatedAt: data.updatedAt ?? null,
          })
        }
        setCalculations(items)
        setLoading(false)
      },
      (error) => {
        console.error('Error al escuchar el historial:', error)
        toast.error('No se pudo cargar el historial de cálculos.')
        setLoading(false)
      },
    )
  }, [uid])

  const saveCalculation = useCallback(
    async (draft: CalculationDraft) => {
      if (!uid) throw new Error('Sesión no iniciada')
      await addDoc(collection(db, 'users', uid, 'calculations'), {
        ...draft,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    },
    [uid],
  )

  const updateCalculation = useCallback(
    async (id: string, draft: CalculationDraft) => {
      if (!uid) throw new Error('Sesión no iniciada')
      await updateDoc(doc(db, 'users', uid, 'calculations', id), {
        ...draft,
        updatedAt: serverTimestamp(),
      })
    },
    [uid],
  )

  const deleteCalculation = useCallback(
    async (id: string) => {
      if (!uid) throw new Error('Sesión no iniciada')
      await deleteDoc(doc(db, 'users', uid, 'calculations', id))
    },
    [uid],
  )

  return { calculations, loading, saveCalculation, updateCalculation, deleteCalculation }
}
