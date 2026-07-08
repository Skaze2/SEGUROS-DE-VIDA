import {
  Building2,
  CalendarCheck,
  Calculator,
  FileCheck,
  HandCoins,
  MapPin,
  Receipt,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface DictionaryTerm {
  /** Término principal, p.ej. "ACA" o "Hogar fiscal". */
  term: string
  /** Nombre completo / traducción / sigla en inglés (opcional). */
  aka?: string
  /** Definición (contenido del usuario, textual). */
  definition: string
}

export interface DictionaryCategory {
  id: string
  title: string
  icon: LucideIcon
  terms: DictionaryTerm[]
}

export const DICTIONARY: DictionaryCategory[] = [
  {
    id: 'programas',
    title: 'Programas y entidades',
    icon: Building2,
    terms: [
      {
        term: 'ACA',
        aka: 'Affordable Care Act · Ley de Cuidado de Salud Asequible · "Obamacare"',
        definition:
          'Ley de 2010 que creó el Mercado de seguros y los subsidios; permite comprar seguro privado con ayuda del gobierno.',
      },
      {
        term: 'Marketplace / Mercado / Exchange',
        definition:
          'Plataforma oficial (HealthCare.gov, o cuidadodesalud.gov en español) donde se compara, solicita y compra el plan, y se ve si hay subsidio.',
      },
      {
        term: 'Medicaid',
        definition:
          'Cobertura pública gratuita o de muy bajo costo para ingresos bajos (hasta ~138% del FPL en estados con expansión). Se solicita todo el año.',
      },
      {
        term: 'Medicare',
        definition:
          'Seguro federal por edad (65+) o discapacidad. Partes A (hospital), B (médico), C (Advantage), D (medicamentos). No se combina con subsidio del Mercado.',
      },
      {
        term: 'CHIP',
        aka: "Children's Health Insurance Program",
        definition:
          'Cobertura pública de bajo costo para niños de familias que ganan demasiado para Medicaid.',
      },
      {
        term: 'Covered California',
        definition: 'El Mercado (Marketplace) del estado de California.',
      },
      {
        term: 'Medi-Cal',
        definition: 'El nombre de Medicaid en California.',
      },
      {
        term: 'MEC',
        aka: 'Minimum Essential Coverage · Cobertura Esencial Mínima',
        definition:
          'Cobertura de salud que cumple el estándar del ACA (trabajo, Medicare, Medicaid). Tener acceso a ella puede descalificar del subsidio.',
      },
    ],
  },
  {
    id: 'subsidios',
    title: 'Subsidios y ayuda financiera',
    icon: HandCoins,
    terms: [
      {
        term: 'FPL',
        aka: 'Federal Poverty Level · Nivel Federal de Pobreza',
        definition:
          'Tabla de ingreso anual por tamaño de hogar; es la vara para medir elegibilidad y cuánta ayuda recibe cada quien.',
      },
      {
        term: 'PTC',
        aka: 'Premium Tax Credit · Crédito Fiscal para la Prima',
        definition: 'El subsidio que reduce la prima mensual.',
      },
      {
        term: 'APTC',
        aka: 'Advance PTC · Crédito adelantado',
        definition:
          'El PTC aplicado por adelantado: se paga cada mes directo a la aseguradora. En la pantalla aparece como "crédito fiscal".',
      },
      {
        term: 'Subsidy cliff',
        aka: 'precipicio del subsidio',
        definition:
          'Punto donde, al pasar el 400% del FPL, se pierde todo el subsidio de golpe (vigente otra vez en 2026).',
      },
      {
        term: 'CSR',
        aka: 'Cost-Sharing Reduction · Reducción de costos compartidos',
        definition:
          'Descuento extra en deducible y copagos para ingresos bajos; solo en planes Silver. En la pantalla es "Ahorros adicionales".',
      },
      {
        term: 'Silver 94/87/73',
        definition:
          'Versiones mejoradas del plan Silver con CSR (menor deducible/copago). El número indica cuánto cubre el plan.',
      },
      {
        term: '1095-A',
        definition:
          'Formulario que el Mercado envía cada año para declarar impuestos y reconciliar el subsidio.',
      },
      {
        term: 'Reconciliación',
        definition:
          'Al declarar, se compara el ingreso real con el estimado: si se recibió subsidio de más, se devuelve; si de menos, se recibe crédito.',
      },
    ],
  },
  {
    id: 'costos',
    title: 'Costos del plan',
    icon: Receipt,
    terms: [
      {
        term: 'Prima',
        aka: 'Premium',
        definition: 'El pago mensual por tener el seguro, se use o no.',
      },
      {
        term: 'Deducible',
        aka: 'Deductible',
        definition: 'Lo que pagas de tu bolsillo antes de que el seguro empiece a pagar.',
      },
      {
        term: 'Copago',
        aka: 'Copay',
        definition: 'Monto fijo por servicio (ej. $20 por consulta).',
      },
      {
        term: 'Coaseguro',
        aka: 'Coinsurance',
        definition: 'Un porcentaje del costo que pagas tú (ej. 50% en sala de emergencias).',
      },
      {
        term: 'Gastos máximos de su bolsillo',
        aka: 'Out-of-pocket maximum',
        definition: 'Tope anual de lo que pagas de tu bolsillo.',
      },
      {
        term: 'Metal tiers',
        aka: 'Bronce · Plata/Silver · Oro/Gold · Platino',
        definition: 'Niveles según cuánto cubre el plan vs. cuánto pagas tú.',
      },
      {
        term: 'Costo total anual estimado',
        definition:
          'Cálculo de lo que gastarías en el año sumando prima + gastos esperados; sirve para comparar planes de forma más realista que solo la prima.',
      },
      {
        term: 'EPO',
        aka: 'Exclusive Provider Organization',
        definition:
          'Tipo de red: solo cubre médicos y hospitales dentro de su red (salvo emergencias) y normalmente no exige referido para especialistas.',
      },
    ],
  },
  {
    id: 'impuestos',
    title: 'Impuestos e ingresos',
    icon: Calculator,
    terms: [
      {
        term: 'MAGI',
        aka: 'Modified Adjusted Gross Income · Ingreso Bruto Ajustado Modificado',
        definition:
          'El ingreso que usa el ACA para calcular el subsidio; incluye el Seguro Social completo.',
      },
      {
        term: 'AGI',
        aka: 'Adjusted Gross Income',
        definition: 'Ingreso bruto menos ciertos ajustes; base para el MAGI.',
      },
      {
        term: 'W-2',
        definition: 'Formulario del empleado: salario e impuestos ya retenidos por el empleador.',
      },
      {
        term: '1099',
        definition:
          'Formulario del trabajador independiente: pagos sin retención; él mismo calcula y paga.',
      },
      {
        term: 'Schedule C',
        aka: 'Anexo C',
        definition:
          'Donde el independiente reporta ingresos y gastos del negocio; da la utilidad neta.',
      },
      {
        term: 'SE tax',
        aka: 'Self-Employment Tax',
        definition: 'Impuesto de Seguro Social y Medicare que paga el independiente.',
      },
      {
        term: 'FICA',
        definition: 'Retención de Seguro Social y Medicare en el pago del empleado W-2.',
      },
      {
        term: 'Deducción estándar',
        definition:
          'Monto fijo que reduce el ingreso gravable; ojo, NO reduce el MAGI del ACA.',
      },
    ],
  },
  {
    id: 'hogar',
    title: 'Hogar e identidad',
    icon: Users,
    terms: [
      {
        term: 'Hogar fiscal',
        aka: 'Tax household',
        definition:
          'Todos los que van en la declaración: declarante, cónyuge y dependientes (vivan o no juntos).',
      },
      {
        term: 'Dependiente',
        aka: 'Dependent',
        definition: 'Persona a cargo que se reclama en los impuestos.',
      },
      {
        term: 'SSN',
        aka: 'Social Security Number',
        definition: 'Número de 9 dígitos (XXX-XX-XXXX) de quien está autorizado a trabajar.',
      },
      {
        term: 'ITIN',
        aka: 'Individual Taxpayer Identification Number',
        definition: 'Número para declarar impuestos de quien no tiene SSN.',
      },
    ],
  },
  {
    id: 'inscripcion',
    title: 'Inscripción y ayuda',
    icon: CalendarCheck,
    terms: [
      {
        term: 'Open Enrollment',
        definition: 'Temporada anual de inscripción abierta.',
      },
      {
        term: 'SEP',
        aka: 'Special Enrollment Period',
        definition: 'Ventana para inscribirse fuera de temporada por un evento de vida.',
      },
      {
        term: 'Assister / Navigator',
        definition: 'Persona certificada que ayuda gratis a solicitar; no vende.',
      },
      {
        term: 'Agent / Broker',
        aka: 'Agente / Corredor',
        definition:
          'Con licencia, sí recomienda y vende planes: el rol del equipo de ventas.',
      },
    ],
  },
  {
    id: 'direccion',
    title: 'Dirección (estándar USPS)',
    icon: MapPin,
    terms: [
      {
        term: 'USPS',
        definition: 'El correo de EE. UU.; valida las direcciones de la solicitud.',
      },
      {
        term: 'Directional',
        definition: 'Orientación de la calle: N, S, E, W (y NE/NW/SE/SW).',
      },
      {
        term: 'Street suffix',
        definition: 'Tipo de vía: St, Rd, Ave, Blvd, Dr, Ln…',
      },
      {
        term: 'ZIP code',
        definition: 'Código postal de 5 dígitos.',
      },
    ],
  },
  {
    id: 'california',
    title: 'California y trámites',
    icon: FileCheck,
    terms: [
      {
        term: 'DHCS',
        aka: 'Department of Health Care Services',
        definition: 'Administra Medi-Cal; fuente de la tabla de pobreza del video.',
      },
      {
        term: 'AIAN',
        aka: 'American Indian / Alaska Native',
        definition: 'Categoría con beneficios especiales de costo cero/limitado.',
      },
      {
        term: 'CCHIP',
        definition: 'CHIP local de los condados de San Francisco, San Mateo y Santa Clara.',
      },
    ],
  },
]

export const TOTAL_TERMS = DICTIONARY.reduce((sum, cat) => sum + cat.terms.length, 0)
