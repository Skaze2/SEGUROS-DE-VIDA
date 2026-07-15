import type { ComponentType } from 'react'
import {
  BookOpen,
  Calculator,
  FlaskConical,
  HeartPulse,
  MapPinned,
  PhoneCall,
  type LucideIcon,
} from 'lucide-react'
import { CalculadoraPage } from '@/features/calculadora/CalculadoraPage'
import { DireccionesPage } from '@/features/direcciones/DireccionesPage'
import { DiccionarioPage } from '@/features/diccionario/DiccionarioPage'
import { EscenariosPage } from '@/features/escenarios/EscenariosPage'
import { TelefonoPage } from '@/features/telefono/TelefonoPage'
import { HealthCostsPage } from '@/features/costos-salud/HealthCostsPage'

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
  {
    id: 'direcciones',
    label: 'Validador de direcciones USA',
    icon: MapPinned,
    component: DireccionesPage,
  },
  {
    id: 'diccionario',
    label: 'Diccionario de términos',
    icon: BookOpen,
    component: DiccionarioPage,
  },
  {
    id: 'escenarios',
    label: 'Simulador de escenarios ACA',
    icon: FlaskConical,
    component: EscenariosPage,
  },
  {
    id: 'telefono',
    label: 'Origen de número telefónico',
    icon: PhoneCall,
    component: TelefonoPage,
  },
  {
    id: 'costos-salud',
    label: 'Estándares de costos de salud',
    icon: HeartPulse,
    component: HealthCostsPage,
  },
]
