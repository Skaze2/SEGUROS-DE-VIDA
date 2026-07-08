import type { ComponentType } from 'react'
import { Calculator, type LucideIcon } from 'lucide-react'
import { CalculadoraPage } from '@/features/calculadora/CalculadoraPage'

export interface ToolSection {
  id: string
  label: string
  icon: LucideIcon
  component: ComponentType
}

/**
 * Registro de herramientas del hub.
 * Para agregar una nueva sección basta con añadir una entrada aquí:
 * el sidebar y el contenido se generan a partir de este array.
 */
export const SECTIONS: ToolSection[] = [
  {
    id: 'calculadora',
    label: 'Calculadora de ingresos anual',
    icon: Calculator,
    component: CalculadoraPage,
  },
]
