/**
 * Escenarios de prueba — Calificación ACA / Obamacare (v1.0).
 * 10 hogares distintos para probar la lógica de elegibilidad al subsidio del Mercado.
 * Fuente FPL: Guías federales de pobreza HHS 2025 (rigen cobertura 2026), 48 estados + DC.
 *
 * Los campos de `referencia_esperada` son ILUSTRATIVOS: se calculan con el FPL federal.
 * El resultado real depende del estado (expansión Medicaid), edad, plan y verificación de estatus.
 */

export type Rol = 'titular' | 'conyuge' | 'dependiente'
export type Contrato = 'W2' | '1099' | null
export type EstatusMigratorio = 'resuelto' | 'no_resuelto'
export type Elegibilidad = 'SI' | 'NO' | 'PARCIAL'

export interface Miembro {
  rol: Rol
  edad: number
  declara_taxes: boolean
  tipo_contrato: Contrato
  ingreso_anual: number
  estatus_migratorio: EstatusMigratorio
  puede_inscribirse_marketplace: boolean
  nota?: string
}

export interface ReferenciaEsperada {
  fpl_100_referencia: number
  porcentaje_fpl: number
  categoria_estimada: string
  elegibilidad_subsidio: Elegibilidad
  nota: string
}

export interface Escenario {
  id: string
  titulo: string
  codigo_postal: string
  ciudad: string
  estado: string
  estado_expansion_medicaid: boolean
  tiene_medicare_medicaid: 'SI' | 'NO'
  tiene_conyuge: 'SI' | 'NO'
  reclama_dependientes: 'SI' | 'NO'
  numero_dependientes: number
  tamano_hogar_fiscal: number
  ingreso_hogar_declarado: number
  estatus_migratorio_resuelto_todos: boolean
  miembros: Miembro[]
  referencia_esperada: ReferenciaEsperada
}

export const ESCENARIOS_META = {
  nombre: 'Escenarios de prueba — Calificación ACA / Obamacare',
  version: '1.0',
  fuente_fpl:
    'Guías federales de pobreza HHS 2025 (rigen la cobertura 2026), 48 estados contiguos + DC. 100% FPL: 1=15,650 · 2=21,150 · 3=26,650 · 4=32,150 · 5=37,650 (+5,500 por persona adicional).',
  reglas_referenciales: [
    '<138% FPL en estado CON expansión de Medicaid → normalmente Medicaid (no subsidio del Mercado).',
    '100%–400% FPL → elegible a subsidio del Mercado (Premium Tax Credit).',
    '>400% FPL → sin subsidio en 2026 (regreso del subsidy cliff).',
    'Si el miembro ya tiene / es elegible a Medicare o Medicaid → no elegible a subsidio del Mercado.',
    'En estados SIN expansión, adultos entre 100% y 138% FPL suelen recibir subsidio del Mercado; los menores suelen calificar a Medicaid/CHIP por umbrales más altos.',
    'Estatus migratorio no resuelto: la persona no puede inscribirse ni recibir subsidio, pero si está en la declaración cuenta para el tamaño e ingreso del hogar fiscal; los demás miembros con estatus resuelto sí pueden solicitar.',
  ],
  aviso:
    'Resultados ilustrativos calculados con el FPL federal. El resultado real depende del estado (expansión de Medicaid, programas locales), la edad, el plan y la verificación de estatus. Verificar la expansión de Medicaid del estado antes de producción.',
} as const

export const ESCENARIOS: Escenario[] = [
  {
    id: 'ESC-01',
    titulo: 'Soltero, W2, sin dependientes',
    codigo_postal: '33135',
    ciudad: 'Miami',
    estado: 'FL',
    estado_expansion_medicaid: false,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'NO',
    reclama_dependientes: 'NO',
    numero_dependientes: 0,
    tamano_hogar_fiscal: 1,
    ingreso_hogar_declarado: 30000,
    estatus_migratorio_resuelto_todos: true,
    miembros: [
      { rol: 'titular', edad: 34, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 30000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 15650,
      porcentaje_fpl: 191.7,
      categoria_estimada: 'Subsidio ACA (138%-400%)',
      elegibilidad_subsidio: 'SI',
      nota: 'Caso base. Un solo declarante W2, todo el ingreso es su bruto.',
    },
  },
  {
    id: 'ESC-02',
    titulo: 'Casado, titular W2, cónyuge NO trabaja ni declara, 2 hijos',
    codigo_postal: '75252',
    ciudad: 'Dallas',
    estado: 'TX',
    estado_expansion_medicaid: false,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 2,
    tamano_hogar_fiscal: 4,
    ingreso_hogar_declarado: 40000,
    estatus_migratorio_resuelto_todos: true,
    miembros: [
      { rol: 'titular', edad: 41, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 40000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'conyuge', edad: 38, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 12, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 8, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 32150,
      porcentaje_fpl: 124.4,
      categoria_estimada: 'Zona <138%: en TX (sin expansión) adultos van a subsidio ACA; menores probablemente Medicaid/CHIP',
      elegibilidad_subsidio: 'SI',
      nota: 'El cónyuge cuenta para el hogar aunque no genere ingreso. Solo un ingreso W2.',
    },
  },
  {
    id: 'ESC-03',
    titulo: 'Casado, ambos declaran W2, 1 hijo',
    codigo_postal: '28205',
    ciudad: 'Charlotte',
    estado: 'NC',
    estado_expansion_medicaid: true,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 1,
    tamano_hogar_fiscal: 3,
    ingreso_hogar_declarado: 70000,
    estatus_migratorio_resuelto_todos: true,
    miembros: [
      { rol: 'titular', edad: 45, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 42000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'conyuge', edad: 43, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 28000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 15, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 26650,
      porcentaje_fpl: 262.7,
      categoria_estimada: 'Subsidio ACA (138%-400%)',
      elegibilidad_subsidio: 'SI',
      nota: 'Dos ingresos W2 se suman en el hogar fiscal (42,000 + 28,000).',
    },
  },
  {
    id: 'ESC-04',
    titulo: 'Casado, titular W2 + cónyuge 1099, 2 hijos',
    codigo_postal: '31401',
    ciudad: 'Savannah',
    estado: 'GA',
    estado_expansion_medicaid: false,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 2,
    tamano_hogar_fiscal: 4,
    ingreso_hogar_declarado: 88000,
    estatus_migratorio_resuelto_todos: true,
    miembros: [
      { rol: 'titular', edad: 39, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 55000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'conyuge', edad: 37, declara_taxes: true, tipo_contrato: '1099', ingreso_anual: 33000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 9, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 6, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 32150,
      porcentaje_fpl: 273.7,
      categoria_estimada: 'Subsidio ACA (138%-400%)',
      elegibilidad_subsidio: 'SI',
      nota: 'Mezcla W2 + 1099. El 33,000 del cónyuge 1099 es NETO (tras gastos del negocio).',
    },
  },
  {
    id: 'ESC-05',
    titulo: 'Casado, ambos 1099, 3 hijos, ingreso alto',
    codigo_postal: '85033',
    ciudad: 'Phoenix',
    estado: 'AZ',
    estado_expansion_medicaid: true,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 3,
    tamano_hogar_fiscal: 5,
    ingreso_hogar_declarado: 160000,
    estatus_migratorio_resuelto_todos: true,
    miembros: [
      { rol: 'titular', edad: 48, declara_taxes: true, tipo_contrato: '1099', ingreso_anual: 90000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'conyuge', edad: 46, declara_taxes: true, tipo_contrato: '1099', ingreso_anual: 70000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 17, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 14, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 11, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 37650,
      porcentaje_fpl: 425.0,
      categoria_estimada: 'Sin subsidio (>400% FPL en 2026)',
      elegibilidad_subsidio: 'NO',
      nota: "Caso del 'subsidy cliff': por poco pasan el 400% y pierden todo el subsidio. Puede comprar plan pero paga prima completa.",
    },
  },
  {
    id: 'ESC-06',
    titulo: 'Casado, ambos W2 + hijo dependiente que declara con 1099',
    codigo_postal: '90012',
    ciudad: 'Los Angeles',
    estado: 'CA',
    estado_expansion_medicaid: true,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 2,
    tamano_hogar_fiscal: 4,
    ingreso_hogar_declarado: 82000,
    estatus_migratorio_resuelto_todos: true,
    miembros: [
      { rol: 'titular', edad: 50, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 40000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'conyuge', edad: 49, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 30000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 21, declara_taxes: true, tipo_contrato: '1099', ingreso_anual: 12000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true, nota: 'Hijo estudiante reclamado como dependiente que además trabaja como independiente; su ingreso suma al hogar fiscal.' },
      { rol: 'dependiente', edad: 13, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 32150,
      porcentaje_fpl: 255.1,
      categoria_estimada: 'Subsidio ACA (138%-400%)',
      elegibilidad_subsidio: 'SI',
      nota: 'Clave: el ingreso del dependiente que declara (12,000) SÍ suma al hogar fiscal → 40,000 + 30,000 + 12,000 = 82,000. En CA aplicaría la tabla de Covered California.',
    },
  },
  {
    id: 'ESC-07',
    titulo: 'Soltero que YA tiene Medicare/Medicaid',
    codigo_postal: '77036',
    ciudad: 'Houston',
    estado: 'TX',
    estado_expansion_medicaid: false,
    tiene_medicare_medicaid: 'SI',
    tiene_conyuge: 'NO',
    reclama_dependientes: 'NO',
    numero_dependientes: 0,
    tamano_hogar_fiscal: 1,
    ingreso_hogar_declarado: 22000,
    estatus_migratorio_resuelto_todos: true,
    miembros: [
      { rol: 'titular', edad: 66, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 22000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 15650,
      porcentaje_fpl: 140.6,
      categoria_estimada: 'No elegible a subsidio del Mercado (ya tiene Medicare/Medicaid)',
      elegibilidad_subsidio: 'NO',
      nota: 'Aunque su % de FPL caería en rango de subsidio, ser elegible a Medicare (66 años) lo descalifica del subsidio del Mercado.',
    },
  },
  {
    id: 'ESC-08',
    titulo: 'Casado, titular W2 (resuelto) + cónyuge 1099 SIN estatus, 2 hijos ciudadanos',
    codigo_postal: '07104',
    ciudad: 'Newark',
    estado: 'NJ',
    estado_expansion_medicaid: true,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 2,
    tamano_hogar_fiscal: 4,
    ingreso_hogar_declarado: 50000,
    estatus_migratorio_resuelto_todos: false,
    miembros: [
      { rol: 'titular', edad: 40, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 30000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'conyuge', edad: 38, declara_taxes: true, tipo_contrato: '1099', ingreso_anual: 20000, estatus_migratorio: 'no_resuelto', puede_inscribirse_marketplace: false },
      { rol: 'dependiente', edad: 10, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 7, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 32150,
      porcentaje_fpl: 155.5,
      categoria_estimada: 'Subsidio ACA (138%-400%) — hogar de estatus mixto',
      elegibilidad_subsidio: 'PARCIAL',
      nota: 'El cónyuge sin estatus resuelto NO se inscribe ni recibe subsidio, pero su ingreso (20,000) SÍ cuenta para el hogar. Titular y 2 hijos sí pueden solicitar.',
    },
  },
  {
    id: 'ESC-09',
    titulo: 'Titular 1099 SIN estatus + cónyuge W2 (resuelto), 1 hijo ciudadano',
    codigo_postal: '60629',
    ciudad: 'Chicago',
    estado: 'IL',
    estado_expansion_medicaid: true,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 1,
    tamano_hogar_fiscal: 3,
    ingreso_hogar_declarado: 45000,
    estatus_migratorio_resuelto_todos: false,
    miembros: [
      { rol: 'titular', edad: 44, declara_taxes: true, tipo_contrato: '1099', ingreso_anual: 20000, estatus_migratorio: 'no_resuelto', puede_inscribirse_marketplace: false },
      { rol: 'conyuge', edad: 41, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 25000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 16, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
    ],
    referencia_esperada: {
      fpl_100_referencia: 26650,
      porcentaje_fpl: 168.9,
      categoria_estimada: 'Subsidio ACA (138%-400%) — hogar de estatus mixto',
      elegibilidad_subsidio: 'PARCIAL',
      nota: 'Quien solicita no es el titular sin estatus (no elegible), sino el cónyuge con estatus y el hijo. El ingreso del titular 1099 igual cuenta para el hogar fiscal.',
    },
  },
  {
    id: 'ESC-10',
    titulo: 'Casado, ambos W2 (resueltos), 3 dependientes con 1 sin estatus',
    codigo_postal: '30310',
    ciudad: 'Atlanta',
    estado: 'GA',
    estado_expansion_medicaid: false,
    tiene_medicare_medicaid: 'NO',
    tiene_conyuge: 'SI',
    reclama_dependientes: 'SI',
    numero_dependientes: 3,
    tamano_hogar_fiscal: 5,
    ingreso_hogar_declarado: 75000,
    estatus_migratorio_resuelto_todos: false,
    miembros: [
      { rol: 'titular', edad: 47, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 45000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'conyuge', edad: 45, declara_taxes: true, tipo_contrato: 'W2', ingreso_anual: 30000, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 18, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 15, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'resuelto', puede_inscribirse_marketplace: true },
      { rol: 'dependiente', edad: 13, declara_taxes: false, tipo_contrato: null, ingreso_anual: 0, estatus_migratorio: 'no_resuelto', puede_inscribirse_marketplace: false },
    ],
    referencia_esperada: {
      fpl_100_referencia: 37650,
      porcentaje_fpl: 199.2,
      categoria_estimada: 'Subsidio ACA (138%-400%) — hogar de estatus mixto',
      elegibilidad_subsidio: 'PARCIAL',
      nota: 'El dependiente sin estatus no se inscribe, pero cuenta para el tamaño del hogar (5) que fija el umbral de FPL. Los demás sí pueden solicitar.',
    },
  },
]
