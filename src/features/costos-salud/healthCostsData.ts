import {
  Activity,
  Baby,
  BedDouble,
  Bone,
  Brain,
  BriefcaseMedical,
  Eye,
  FlaskConical,
  HeartPulse,
  Pill,
  ScanLine,
  Scissors,
  Smile,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from 'lucide-react'

export interface HealthCostItem {
  name: string
  aka?: string
  costLow: number
  costHigh: number
  unit: string
  recovery?: string
  extra?: string
  talkingPoint: string
}

export interface HealthCostCategory {
  id: string
  title: string
  items: HealthCostItem[]
}

/**
 * Rangos de costos de salud en EE. UU. SIN seguro (self-pay / precio de lista).
 * Compilados y verificados contra fuentes públicas (Healthcare Bluebook, FAIR Health,
 * GoodRx, KFF, chargemasters) por un workflow multi-agente con auditoría de plausibilidad.
 * Son ESTIMADOS de referencia para conversación de ventas — no cotizaciones.
 * 548 escenarios en 15 categorías.
 */

/** Icono por categoría (desacoplado de los datos). */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  fracturas: Bone,
  medicinas: Pill,
  consultas: Stethoscope,
  especialistas: BriefcaseMedical,
  imagenes: ScanLine,
  laboratorio: FlaskConical,
  cirugias: Scissors,
  maternidad: Baby,
  'salud-mental': Brain,
  dental: Smile,
  vision: Eye,
  vacunas: Syringe,
  hospitalizacion: BedDouble,
  terapias: Activity,
  cronicas: HeartPulse,
}

export const HEALTH_COSTS: HealthCostCategory[] = [
  {
    "id": "fracturas",
    "title": "Fracturas y lesiones",
    "items": [
      {
        "name": "Fractura de dedo de la mano",
        "aka": "Finger fracture (phalanx)",
        "costLow": 1000,
        "costHigh": 3500,
        "unit": "por tratamiento",
        "recovery": "3 a 6 semanas",
        "extra": "Casi siempre ambulatorio con férula, sin cirugía",
        "talkingPoint": "Hasta la fractura más pequeña cuesta miles sin seguro; asegurado casi no pagas nada."
      },
      {
        "name": "Fractura de mano (metacarpiano)",
        "aka": "Metacarpal/hand fracture",
        "costLow": 2000,
        "costHigh": 9000,
        "unit": "por tratamiento",
        "recovery": "6 a 8 semanas",
        "extra": "Con cirugía y placa sube a $8,000 o más",
        "talkingPoint": "Una mano que se opera te cuesta un salario; el seguro convierte eso en un copago."
      },
      {
        "name": "Fractura de muñeca (Colles)",
        "aka": "Wrist fracture (Colles)",
        "costLow": 2500,
        "costHigh": 16000,
        "unit": "por tratamiento",
        "recovery": "6 a 12 semanas",
        "extra": "Reducción cerrada barata; con placas/tornillos en el extremo alto",
        "talkingPoint": "Una caída boba puede costar $16,000; por eso conviene estar cubierto antes del accidente."
      },
      {
        "name": "Fractura de antebrazo (radio y cúbito)",
        "aka": "Forearm fracture (radius/ulna)",
        "costLow": 2500,
        "costHigh": 16000,
        "unit": "por tratamiento",
        "recovery": "8 a 12 semanas",
        "extra": "Dos huesos suelen requerir cirugía",
        "talkingPoint": "Dos huesos rotos duplican la factura; el seguro te protege del golpe económico."
      },
      {
        "name": "Fractura de brazo (húmero)",
        "aka": "Humerus fracture",
        "costLow": 3000,
        "costHigh": 20000,
        "unit": "por tratamiento",
        "recovery": "8 a 12 semanas",
        "extra": "Sin cirugía con cabestrillo; con placa mucho más caro",
        "talkingPoint": "El precio depende de si necesitas cirugía; asegurado no te preocupa esa lotería."
      },
      {
        "name": "Fractura de codo",
        "aka": "Elbow fracture",
        "costLow": 3000,
        "costHigh": 18000,
        "unit": "por tratamiento",
        "recovery": "6 a 12 semanas",
        "extra": "Con frecuencia requiere fijación quirúrgica",
        "talkingPoint": "Recuperar la movilidad del codo cuesta caro; prevé el gasto con una buena póliza."
      },
      {
        "name": "Fractura de clavícula",
        "aka": "Clavicle fracture",
        "costLow": 2000,
        "costHigh": 16000,
        "unit": "por tratamiento",
        "recovery": "6 a 12 semanas",
        "extra": "Cabestrillo económico; con placa el costo se dispara",
        "talkingPoint": "Común en deportes y caídas: el seguro cubre tanto el cabestrillo como la cirugía."
      },
      {
        "name": "Fractura de escápula (omóplato)",
        "aka": "Scapula fracture",
        "costLow": 2500,
        "costHigh": 15000,
        "unit": "por tratamiento",
        "recovery": "6 a 12 semanas",
        "extra": "Suele acompañar traumas de alto impacto",
        "talkingPoint": "Las lesiones de alto impacto rara vez vienen solas; el seguro cubre todo el paquete."
      },
      {
        "name": "Fractura de costilla",
        "aka": "Rib fracture",
        "costLow": 1500,
        "costHigh": 8000,
        "unit": "por tratamiento",
        "recovery": "6 semanas",
        "extra": "Manejo con analgesia; varias costillas pueden requerir hospital",
        "talkingPoint": "Respirar con costillas rotas ya duele bastante sin sumarle una factura de $8,000."
      },
      {
        "name": "Fractura de esternón",
        "aka": "Sternum fracture",
        "costLow": 2000,
        "costHigh": 12000,
        "unit": "por tratamiento",
        "recovery": "6 a 10 semanas",
        "extra": "Requiere descartar lesión cardíaca con estudios",
        "talkingPoint": "Los estudios para descartar daño interno se acumulan rápido; el seguro los absorbe."
      },
      {
        "name": "Fractura de columna (vértebra)",
        "aka": "Spinal/vertebral fracture",
        "costLow": 10000,
        "costHigh": 100000,
        "unit": "por tratamiento",
        "recovery": "3 a 6 meses",
        "extra": "Observación si es estable; fusión vertebral en el extremo alto",
        "talkingPoint": "Una cirugía de columna puede pasar de $100,000; sin seguro es una deuda de por vida."
      },
      {
        "name": "Fractura de pelvis",
        "aka": "Pelvic fracture",
        "costLow": 15000,
        "costHigh": 60000,
        "unit": "por tratamiento",
        "recovery": "3 a 6 meses",
        "extra": "Casi siempre hospitalización prolongada",
        "talkingPoint": "Estancias largas en el hospital multiplican el costo; asegurarte limita tu gasto máximo."
      },
      {
        "name": "Fractura de cadera",
        "aka": "Hip fracture",
        "costLow": 13000,
        "costHigh": 45000,
        "unit": "por tratamiento",
        "recovery": "3 a 6 meses",
        "extra": "Casi siempre requiere cirugía y hospitalización",
        "talkingPoint": "Una de las lesiones más caras en adultos mayores; el seguro es clave al envejecer."
      },
      {
        "name": "Fractura de fémur",
        "aka": "Femur fracture",
        "costLow": 17000,
        "costHigh": 50000,
        "unit": "por tratamiento",
        "recovery": "3 a 6 meses",
        "extra": "Clavo intramedular y anestesia general",
        "talkingPoint": "El hueso más fuerte roto genera la factura más fuerte; mejor tenerlo cubierto."
      },
      {
        "name": "Fractura de rótula",
        "aka": "Patella (kneecap) fracture",
        "costLow": 3000,
        "costHigh": 20000,
        "unit": "por tratamiento",
        "recovery": "6 a 12 semanas",
        "extra": "Con cirugía si los fragmentos se separan",
        "talkingPoint": "Volver a caminar bien vale oro; el seguro cubre la cirugía y la rehabilitación."
      },
      {
        "name": "Fractura de tibia y peroné",
        "aka": "Tibia-fibula fracture",
        "costLow": 5000,
        "costHigh": 35000,
        "unit": "por tratamiento",
        "recovery": "3 a 6 meses",
        "extra": "Clavo intramedular en casos graves",
        "talkingPoint": "Una pierna rota puede dejarte sin trabajar meses; el seguro cubre el hueco médico."
      },
      {
        "name": "Fractura de tobillo",
        "aka": "Ankle fracture (ORIF)",
        "costLow": 2500,
        "costHigh": 20000,
        "unit": "por tratamiento",
        "recovery": "6 a 12 semanas",
        "extra": "Cirugía ORIF con placas y tornillos $6,000-$12,000",
        "talkingPoint": "Un tropiezo puede costar $20,000 con placas y tornillos; el seguro te cubre la caída."
      },
      {
        "name": "Fractura de pie (metatarsiano)",
        "aka": "Foot/metatarsal fracture",
        "costLow": 2000,
        "costHigh": 12000,
        "unit": "por tratamiento",
        "recovery": "6 a 8 semanas",
        "extra": "Bota ortopédica económica; cirugía si hay desplazamiento",
        "talkingPoint": "Cada hueso del pie cuenta y cada factura suma; mejor prevenirlo con cobertura."
      },
      {
        "name": "Fractura de dedo del pie",
        "aka": "Toe fracture",
        "costLow": 800,
        "costHigh": 3000,
        "unit": "por tratamiento",
        "recovery": "4 a 6 semanas",
        "extra": "Suele tratarse vendando el dedo al vecino (sindactilia)",
        "talkingPoint": "Hasta lo que parece menor pasa por urgencias y radiografías que se cobran caro."
      },
      {
        "name": "Fractura de nariz",
        "aka": "Nasal fracture",
        "costLow": 1500,
        "costHigh": 12000,
        "unit": "por tratamiento",
        "recovery": "1 a 2 semanas (reducción)",
        "extra": "Reducción cerrada barata; septorrinoplastia en el extremo alto",
        "talkingPoint": "Corregir la nariz por fuera y por dentro cuesta miles; el seguro cubre lo funcional."
      },
      {
        "name": "Fractura de mandíbula",
        "aka": "Jaw/mandible fracture",
        "costLow": 5000,
        "costHigh": 30000,
        "unit": "por tratamiento",
        "recovery": "6 a 8 semanas",
        "extra": "Fijación con placas/alambres y anestesia general",
        "talkingPoint": "Comer y hablar de nuevo tiene precio; asegurarte evita elegir entre salud y deuda."
      },
      {
        "name": "Fractura de cráneo",
        "aka": "Skull fracture",
        "costLow": 10000,
        "costHigh": 100000,
        "unit": "por tratamiento",
        "recovery": "Semanas a meses",
        "extra": "Puede requerir UCI y neurocirugía",
        "talkingPoint": "Un golpe en la cabeza puede vaciar tus ahorros; el seguro cubre lo impredecible."
      },
      {
        "name": "Esguince de tobillo",
        "aka": "Ankle sprain",
        "costLow": 1000,
        "costHigh": 4000,
        "unit": "por tratamiento",
        "recovery": "2 a 6 semanas",
        "extra": "Radiografía para descartar fractura, férula y reposo",
        "talkingPoint": "El esguince más común igual pasa por urgencias; el seguro te ahorra ese susto."
      },
      {
        "name": "Esguince de muñeca",
        "aka": "Wrist sprain",
        "costLow": 800,
        "costHigh": 3000,
        "unit": "por tratamiento",
        "recovery": "2 a 4 semanas",
        "extra": "A menudo confundido con fractura, exige imágenes",
        "talkingPoint": "No sabes si es esguince o fractura sin una radiografía que sin seguro pagas completa."
      },
      {
        "name": "Esguince de rodilla",
        "aka": "Knee sprain",
        "costLow": 1000,
        "costHigh": 4500,
        "unit": "por tratamiento",
        "recovery": "2 a 6 semanas",
        "extra": "Puede requerir resonancia para descartar desgarro",
        "talkingPoint": "Descartar una lesión mayor requiere resonancia; el seguro cubre ese estudio caro."
      },
      {
        "name": "Luxación de hombro",
        "aka": "Shoulder dislocation",
        "costLow": 2000,
        "costHigh": 12000,
        "unit": "por tratamiento",
        "recovery": "6 a 12 semanas",
        "extra": "Reducción en urgencias; recidivante puede requerir cirugía",
        "talkingPoint": "Volver a colocar el hombro es rápido, pero la factura de urgencias no lo es."
      },
      {
        "name": "Luxación de dedo",
        "aka": "Finger dislocation",
        "costLow": 800,
        "costHigh": 3000,
        "unit": "por tratamiento",
        "recovery": "3 a 6 semanas",
        "extra": "Reducción manual con radiografía de control",
        "talkingPoint": "Un dedo dislocado en un partido termina en urgencias; el seguro cubre el imprevisto."
      },
      {
        "name": "Luxación de rótula",
        "aka": "Patella dislocation",
        "costLow": 2000,
        "costHigh": 10000,
        "unit": "por tratamiento",
        "recovery": "6 semanas",
        "extra": "Rehabilitación para evitar recaídas",
        "talkingPoint": "La rehabilitación evita que se repita, y el seguro la cubre sin vaciar tu bolsillo."
      },
      {
        "name": "Luxación de cadera",
        "aka": "Hip dislocation",
        "costLow": 5000,
        "costHigh": 25000,
        "unit": "por tratamiento",
        "recovery": "2 a 4 meses",
        "extra": "Emergencia que requiere sedación y a veces cirugía",
        "talkingPoint": "Es una emergencia real; sin seguro la factura llega antes que la recuperación."
      },
      {
        "name": "Desgarro de ligamento cruzado anterior (LCA)",
        "aka": "ACL tear reconstruction",
        "costLow": 20000,
        "costHigh": 50000,
        "unit": "por tratamiento",
        "recovery": "6 a 9 meses",
        "extra": "Incluye cirujano, quirófano, anestesia e injerto",
        "talkingPoint": "La lesión estrella del deporte cuesta hasta $50,000; el seguro la vuelve accesible."
      },
      {
        "name": "Desgarro de menisco",
        "aka": "Meniscus tear repair",
        "costLow": 7000,
        "costHigh": 30000,
        "unit": "por tratamiento",
        "recovery": "6 semanas a 4 meses",
        "extra": "Meniscectomía más barata que la reparación con sutura",
        "talkingPoint": "Reparar la rodilla bien hecha cuesta caro; asegurado eliges calidad, no precio."
      },
      {
        "name": "Desgarro del manguito rotador",
        "aka": "Rotator cuff tear repair",
        "costLow": 5000,
        "costHigh": 25000,
        "unit": "por tratamiento",
        "recovery": "4 a 6 meses",
        "extra": "Artroscopia más económica que cirugía abierta",
        "talkingPoint": "Levantar el brazo sin dolor tiene precio; el seguro cubre cirugía y fisioterapia."
      },
      {
        "name": "Rotura del tendón de Aquiles",
        "aka": "Achilles tendon rupture repair",
        "costLow": 10000,
        "costHigh": 31000,
        "unit": "por tratamiento",
        "recovery": "4 a 6 meses",
        "extra": "Reparación abierta o mínimamente invasiva más rehabilitación",
        "talkingPoint": "Un tendón roto te deja meses sin caminar normal; el seguro cubre el largo camino."
      },
      {
        "name": "Desgarro muscular (distensión)",
        "aka": "Muscle strain/tear",
        "costLow": 500,
        "costHigh": 3000,
        "unit": "por tratamiento",
        "recovery": "2 a 8 semanas",
        "extra": "Casos graves requieren imágenes y fisioterapia",
        "talkingPoint": "Incluso lo leve pasa por consulta e imágenes; el seguro cubre el diagnóstico."
      },
      {
        "name": "Conmoción cerebral",
        "aka": "Concussion",
        "costLow": 1500,
        "costHigh": 12000,
        "unit": "por tratamiento",
        "recovery": "1 a 4 semanas",
        "extra": "Sube mucho si se hace TAC en urgencias",
        "talkingPoint": "Un simple golpe con TAC puede costar $12,000; el seguro cubre descartar lo grave."
      },
      {
        "name": "Quemadura de primer grado",
        "aka": "First-degree burn",
        "costLow": 150,
        "costHigh": 1000,
        "unit": "por tratamiento",
        "recovery": "3 a 7 días",
        "extra": "Suele tratarse en casa o urgencias sin hospitalización",
        "talkingPoint": "La quemadura más leve igual genera consulta; con seguro es un copago mínimo."
      },
      {
        "name": "Quemadura de segundo grado",
        "aka": "Second-degree burn",
        "costLow": 2000,
        "costHigh": 40000,
        "unit": "por tratamiento",
        "recovery": "2 a 3 semanas",
        "extra": "Extensas requieren centro de quemados e injertos",
        "talkingPoint": "Según la extensión, salta a decenas de miles; el seguro cubre el centro especializado."
      },
      {
        "name": "Quemadura de tercer grado",
        "aka": "Third-degree burn",
        "costLow": 50000,
        "costHigh": 1000000,
        "unit": "por tratamiento",
        "recovery": "Meses",
        "extra": "Injertos de piel, UCI y cirugías repetidas",
        "talkingPoint": "Una quemadura grave puede pasar del millón de dólares; ningún ahorro personal aguanta eso."
      },
      {
        "name": "Laceración y puntos de sutura",
        "aka": "Laceration repair / stitches",
        "costLow": 150,
        "costHigh": 3000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Urgent care $150-$400; sala de urgencias $700-$3,000",
        "talkingPoint": "El mismo corte cuesta 10 veces más en urgencias; el seguro cubre donde te atiendan."
      },
      {
        "name": "Latigazo cervical",
        "aka": "Whiplash",
        "costLow": 2000,
        "costHigh": 30000,
        "unit": "por tratamiento",
        "recovery": "Semanas a meses",
        "extra": "Incluye imágenes, fisioterapia y manejo del dolor",
        "talkingPoint": "El clásico del choque de auto acumula fisioterapia y estudios; el seguro los cubre."
      },
      {
        "name": "Lesión de espalda / hernia discal",
        "aka": "Back injury / herniated disc",
        "costLow": 2000,
        "costHigh": 100000,
        "unit": "por tratamiento",
        "recovery": "Semanas a meses",
        "extra": "Tratamiento conservador barato; cirugía de columna en el extremo alto",
        "talkingPoint": "La espalda va de fisioterapia a cirugía de $100,000; el seguro cubre todo el rango."
      },
      {
        "name": "Contusión / hematoma",
        "aka": "Contusion / bruise",
        "costLow": 150,
        "costHigh": 1500,
        "unit": "por tratamiento",
        "recovery": "1 a 3 semanas",
        "extra": "Imágenes si hay sospecha de daño profundo",
        "talkingPoint": "Un golpe fuerte igual amerita revisión; el seguro cubre descartar algo mayor."
      },
      {
        "name": "Fractura por estrés",
        "aka": "Stress fracture",
        "costLow": 1000,
        "costHigh": 6000,
        "unit": "por tratamiento",
        "recovery": "6 a 8 semanas",
        "extra": "El diagnóstico suele requerir resonancia magnética",
        "talkingPoint": "Estas fracturas no se ven en radiografía simple; el seguro cubre la resonancia que sí las detecta."
      },
      {
        "name": "Fractura abierta (expuesta)",
        "aka": "Open/compound fracture",
        "costLow": 15000,
        "costHigh": 60000,
        "unit": "por tratamiento",
        "recovery": "3 a 6 meses",
        "extra": "Cirugía urgente, limpieza quirúrgica y antibióticos intravenosos",
        "talkingPoint": "Hueso expuesto es emergencia con quirófano inmediato; sin seguro es una factura brutal."
      },
      {
        "name": "Dedo en martillo",
        "aka": "Mallet finger",
        "costLow": 500,
        "costHigh": 3000,
        "unit": "por tratamiento",
        "recovery": "6 a 8 semanas",
        "extra": "Férula prolongada; cirugía si hay avulsión ósea",
        "talkingPoint": "Una lesión pequeña con férula de semanas igual cuesta; el seguro la cubre sin drama."
      },
      {
        "name": "Radiografía diagnóstica",
        "aka": "X-ray imaging",
        "costLow": 100,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "El precio varía por región del cuerpo y suele ser múltiple",
        "talkingPoint": "Toda lesión empieza con radiografías que se cobran una por una; el seguro las incluye."
      },
      {
        "name": "Resonancia magnética articular",
        "aka": "MRI (joint/extremity)",
        "costLow": 400,
        "costHigh": 3500,
        "unit": "por estudio",
        "extra": "Más cara en hospital que en centro ambulatorio",
        "talkingPoint": "La resonancia detecta lo que la radiografía no ve, pero su precio asusta sin cobertura."
      },
      {
        "name": "Colocación de yeso o férula",
        "aka": "Casting / splinting",
        "costLow": 200,
        "costHigh": 1500,
        "unit": "por procedimiento",
        "extra": "Se cobra aparte de la consulta y las imágenes",
        "talkingPoint": "Hasta el yeso se factura por separado; el seguro evita que cada paso te sorprenda."
      }
    ]
  },
  {
    "id": "medicinas",
    "title": "Medicinas",
    "items": [
      {
        "name": "Metformina",
        "aka": "Metformin (Glucophage)",
        "costLow": 4,
        "costHigh": 30,
        "unit": "por mes",
        "extra": "Genérico baratísimo; suele ser gratis o $4 en muchas farmacias.",
        "talkingPoint": "El genérico para la diabetes cuesta centavos al día; sin control, una hospitalización por descompensación vale miles."
      },
      {
        "name": "Insulina glargina (Lantus)",
        "aka": "Insulin glargine (Lantus / Basaglar)",
        "costLow": 80,
        "costHigh": 300,
        "unit": "por mes",
        "extra": "Pluma ~$80; frasco de 1000 U ~$285. Biosimilares abaratan.",
        "talkingPoint": "Sin seguro un frasco de insulina puede costar cientos al mes; con cobertura el copago baja drásticamente."
      },
      {
        "name": "Insulina lispro (Humalog)",
        "aka": "Insulin lispro (Humalog)",
        "costLow": 90,
        "costHigh": 340,
        "unit": "por mes",
        "extra": "Versiones autorizadas/genéricas cuestan bastante menos.",
        "talkingPoint": "La insulina rápida es un gasto de por vida; asegurarse evita elegir entre comer o medicarse."
      },
      {
        "name": "Semaglutida (Ozempic)",
        "aka": "Semaglutide (Ozempic)",
        "costLow": 150,
        "costHigh": 1000,
        "unit": "por mes",
        "extra": "Lista ~$1,000; con cupón desde ~$150-$199. Sin genérico.",
        "talkingPoint": "Sin seguro el precio de lista roza los $1,000 al mes; la cobertura lo vuelve accesible."
      },
      {
        "name": "Empagliflozina (Jardiance)",
        "aka": "Empagliflozine (Jardiance)",
        "costLow": 500,
        "costHigh": 650,
        "unit": "por mes",
        "extra": "Sin genérico; precio de lista ~$600.",
        "talkingPoint": "Un medicamento cardio-diabético sin genérico que sin seguro cuesta cientos cada mes."
      },
      {
        "name": "Dulaglutida (Trulicity)",
        "aka": "Dulaglutide (Trulicity)",
        "costLow": 850,
        "costHigh": 1050,
        "unit": "por mes",
        "extra": "Cartón de 4 plumas; sin genérico.",
        "talkingPoint": "Casi $1,000 mensuales sin seguro para controlar el azúcar; la cobertura es la diferencia."
      },
      {
        "name": "Glipizida",
        "aka": "Glipizide (Glucotrol)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Otra opción genérica muy barata para diabetes; prevenir complicaciones es lo costoso de evitar."
      },
      {
        "name": "Lisinopril",
        "aka": "Lisinopril (Prinivil / Zestril)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por mes",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Controlar la presión cuesta centavos al día; un ACV sin control puede costar más de $20,000."
      },
      {
        "name": "Amlodipino",
        "aka": "Amlodipine (Norvasc)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por mes",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Presión controlada por menos de un café al mes previene infartos carísimos."
      },
      {
        "name": "Losartán",
        "aka": "Losartan (Cozaar)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "La hipertensión no duele, pero no tratarla sí cuesta; el genérico es casi gratis."
      },
      {
        "name": "Atorvastatina",
        "aka": "Atorvastatin (Lipitor)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico barato; marca Lipitor mucho más cara.",
        "talkingPoint": "Bajar el colesterol cuesta poquísimo hoy; un bypass cardíaco supera los $100,000."
      },
      {
        "name": "Rosuvastatina",
        "aka": "Rosuvastatin (Crestor)",
        "costLow": 8,
        "costHigh": 30,
        "unit": "por mes",
        "extra": "Genérico abarata mucho vs. Crestor de marca.",
        "talkingPoint": "Estatina potente ya genérica; prevenir el infarto es infinitamente más barato que tratarlo."
      },
      {
        "name": "Metoprolol",
        "aka": "Metoprolol (Lopressor / Toprol XL)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Betabloqueador genérico de bajo costo que protege el corazón día a día."
      },
      {
        "name": "Apixabán (Eliquis)",
        "aka": "Apixaban (Eliquis)",
        "costLow": 550,
        "costHigh": 650,
        "unit": "por mes",
        "extra": "Sin genérico aún; precio de lista ~$600.",
        "talkingPoint": "Un anticoagulante sin genérico que sin seguro cuesta cientos; evita coágulos y hospitalizaciones."
      },
      {
        "name": "Warfarina",
        "aka": "Warfarin (Coumadin)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico barato; requiere control de INR.",
        "talkingPoint": "Anticoagulante clásico casi gratis, pero requiere análisis periódicos que el seguro cubre."
      },
      {
        "name": "Clopidogrel",
        "aka": "Clopidogrel (Plavix)",
        "costLow": 6,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico abarata mucho vs. Plavix.",
        "talkingPoint": "Antiagregante genérico económico que previene un segundo infarto muy costoso."
      },
      {
        "name": "Albuterol inhalador",
        "aka": "Albuterol (ProAir / Ventolin)",
        "costLow": 20,
        "costHigh": 70,
        "unit": "por envase",
        "extra": "Genérico ~$25-$35; marca más caro.",
        "talkingPoint": "El inhalador de rescate sin seguro puede costar $60; una crisis de asma en urgencias, miles."
      },
      {
        "name": "Fluticasona/salmeterol (Advair)",
        "aka": "Fluticasone/salmeterol (Advair Diskus / Wixela)",
        "costLow": 90,
        "costHigh": 400,
        "unit": "por envase",
        "extra": "Genérico Wixela ~$90-$150 vs. Advair de marca ~$400.",
        "talkingPoint": "El control diario del asma evita hospitalizaciones respiratorias carísimas."
      },
      {
        "name": "Budesonida/formoterol (Symbicort)",
        "aka": "Budesonide/formoterol (Symbicort)",
        "costLow": 90,
        "costHigh": 350,
        "unit": "por envase",
        "extra": "Genérico abarata frente a Symbicort de marca.",
        "talkingPoint": "Mantener el asma o EPOC controlado cuesta menos que una sola noche hospitalizado."
      },
      {
        "name": "Montelukast",
        "aka": "Montelukast (Singulair)",
        "costLow": 5,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Control de asma y alergia con genérico muy barato; prevenir crisis ahorra urgencias."
      },
      {
        "name": "Prednisona",
        "aka": "Prednisone",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por envase",
        "extra": "Genérico muy barato; suele ser tratamiento corto.",
        "talkingPoint": "Corticoide genérico baratísimo para brotes; el seguro cubre la consulta que lo indica."
      },
      {
        "name": "Sertralina",
        "aka": "Sertraline (Zoloft)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico muy barato vs. Zoloft de marca.",
        "talkingPoint": "Tratar la depresión cuesta centavos al día con genérico; la salud mental no debería esperar."
      },
      {
        "name": "Escitalopram (Lexapro)",
        "aka": "Escitalopram (Lexapro)",
        "costLow": 4,
        "costHigh": 30,
        "unit": "por mes",
        "extra": "Genérico abarata mucho frente a Lexapro.",
        "talkingPoint": "Antidepresivo/ansiolítico genérico accesible; la cobertura incluye la terapia que lo acompaña."
      },
      {
        "name": "Fluoxetina",
        "aka": "Fluoxetine (Prozac)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Uno de los antidepresivos más baratos; asegurar la continuidad del tratamiento es clave."
      },
      {
        "name": "Bupropión",
        "aka": "Bupropion (Wellbutrin / Zyban)",
        "costLow": 10,
        "costHigh": 40,
        "unit": "por mes",
        "extra": "Genérico; versión XL algo más cara.",
        "talkingPoint": "Sirve para depresión y dejar de fumar; el genérico es accesible con o sin seguro."
      },
      {
        "name": "Anfetamina/dextroanfetamina (Adderall)",
        "aka": "Amphetamine/dextroamphetamine (Adderall)",
        "costLow": 20,
        "costHigh": 90,
        "unit": "por mes",
        "extra": "Genérico ~$20-$40; controlado. Marca más caro.",
        "talkingPoint": "El TDAH tratado mejora trabajo y vida; el genérico es mucho más barato que la marca."
      },
      {
        "name": "Lisdexanfetamina (Vyvanse)",
        "aka": "Lisdexamfetamine (Vyvanse)",
        "costLow": 80,
        "costHigh": 360,
        "unit": "por mes",
        "extra": "Genérico ~$80-$120 vs. Vyvanse marca ~$350. Controlado.",
        "talkingPoint": "Ahora con genérico, pero la marca supera $300 al mes sin seguro."
      },
      {
        "name": "Alprazolam",
        "aka": "Alprazolam (Xanax)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico; controlado.",
        "talkingPoint": "Ansiolítico genérico barato; el seguro cubre el seguimiento médico necesario."
      },
      {
        "name": "Levotiroxina",
        "aka": "Levothyroxine (Synthroid)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico muy barato vs. Synthroid de marca.",
        "talkingPoint": "La tiroides se controla por centavos al día; sin tratamiento, las complicaciones se acumulan."
      },
      {
        "name": "Omeprazol",
        "aka": "Omeprazole (Prilosec)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico y OTC muy baratos.",
        "talkingPoint": "El reflujo tratado a tiempo evita daños y estudios costosos como endoscopias."
      },
      {
        "name": "Pantoprazol",
        "aka": "Pantoprazole (Protonix)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Protector gástrico genérico económico; prevenir úlceras ahorra urgencias."
      },
      {
        "name": "Loratadina",
        "aka": "Loratadine (Claritin)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por mes",
        "extra": "Genérico/OTC muy barato.",
        "talkingPoint": "Antialérgico OTC baratísimo; la prevención evita consultas repetidas."
      },
      {
        "name": "Cetirizina",
        "aka": "Cetirizine (Zyrtec)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por mes",
        "extra": "Genérico/OTC muy barato.",
        "talkingPoint": "Alergias controladas por centavos al día; asegurarse cubre lo inesperado."
      },
      {
        "name": "Fluticasona nasal (Flonase)",
        "aka": "Fluticasone nasal spray (Flonase)",
        "costLow": 8,
        "costHigh": 25,
        "unit": "por envase",
        "extra": "Genérico/OTC barato.",
        "talkingPoint": "Spray nasal OTC económico que evita sinusitis y consultas."
      },
      {
        "name": "Amoxicilina",
        "aka": "Amoxicillin",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por tratamiento",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Antibiótico genérico baratísimo; tratar la infección a tiempo evita hospitalización."
      },
      {
        "name": "Azitromicina (Z-Pak)",
        "aka": "Azithromycin (Z-Pak)",
        "costLow": 10,
        "costHigh": 30,
        "unit": "por tratamiento",
        "extra": "Genérico económico.",
        "talkingPoint": "El clásico Z-Pak es económico; una neumonía sin tratar cuesta miles en el hospital."
      },
      {
        "name": "Doxiciclina",
        "aka": "Doxycycline",
        "costLow": 10,
        "costHigh": 40,
        "unit": "por tratamiento",
        "extra": "Genérico; precio varía por presentación.",
        "talkingPoint": "Antibiótico versátil y genérico; el seguro cubre la consulta que lo prescribe."
      },
      {
        "name": "Cefalexina",
        "aka": "Cephalexin (Keflex)",
        "costLow": 6,
        "costHigh": 25,
        "unit": "por tratamiento",
        "extra": "Genérico económico.",
        "talkingPoint": "Antibiótico común y barato para infecciones de piel; prevenir su avance ahorra mucho."
      },
      {
        "name": "Ibuprofeno",
        "aka": "Ibuprofen (Advil / Motrin)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por envase",
        "extra": "Genérico/OTC muy barato.",
        "talkingPoint": "Analgésico OTC baratísimo; el chequeo con seguro descarta causas de dolor serias."
      },
      {
        "name": "Acetaminofén",
        "aka": "Acetaminophen (Tylenol)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por envase",
        "extra": "Genérico/OTC muy barato.",
        "talkingPoint": "Uno de los remedios más baratos que existen; la prevención cubre lo que él no soluciona."
      },
      {
        "name": "Gabapentina",
        "aka": "Gabapentin (Neurontin)",
        "costLow": 4,
        "costHigh": 30,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Para dolor neuropático el genérico es accesible; el seguimiento lo cubre el seguro."
      },
      {
        "name": "Tramadol",
        "aka": "Tramadol (Ultram)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico; controlado.",
        "talkingPoint": "Analgésico genérico de bajo costo; el manejo del dolor crónico requiere control médico."
      },
      {
        "name": "Sumatriptán",
        "aka": "Sumatriptan (Imitrex)",
        "costLow": 8,
        "costHigh": 40,
        "unit": "por envase",
        "extra": "Genérico abarata mucho vs. Imitrex.",
        "talkingPoint": "Corta la migraña por pocos dólares; sin tratar, cada crisis cuesta días de trabajo."
      },
      {
        "name": "Rimegepant (Nurtec ODT)",
        "aka": "Rimegepant (Nurtec ODT)",
        "costLow": 950,
        "costHigh": 1100,
        "unit": "por mes",
        "extra": "Sin genérico; precio de lista muy alto.",
        "talkingPoint": "El nuevo tratamiento de migraña sin genérico supera $1,000; la cobertura lo hace viable."
      },
      {
        "name": "Anticonceptivo oral combinado",
        "aka": "Combined oral contraceptive (e.g. Sprintec, Junel)",
        "costLow": 10,
        "costHigh": 50,
        "unit": "por mes",
        "extra": "Genéricos ~$10-$25; marcas más caras.",
        "talkingPoint": "Las píldoras genéricas son baratas; el seguro suele cubrir anticoncepción sin copago."
      },
      {
        "name": "Emtricitabina/tenofovir (PrEP)",
        "aka": "Emtricitabine/tenofovir (Truvada, generic)",
        "costLow": 30,
        "costHigh": 1800,
        "unit": "por mes",
        "extra": "Genérico ~$30-$60 vs. Truvada marca ~$1,800.",
        "talkingPoint": "El genérico de PrEP cuesta ~$30, pero la marca ronda $1,800; la cobertura marca la diferencia."
      },
      {
        "name": "Emtricitabina/tenofovir alafenamida (Descovy)",
        "aka": "Emtricitabine/tenofovir alafenamide (Descovy)",
        "costLow": 2200,
        "costHigh": 2800,
        "unit": "por mes",
        "extra": "Sin genérico; precio de lista ~$2,400.",
        "talkingPoint": "PrEP de marca sin genérico que supera $2,000 al mes; asegurarse la vuelve accesible."
      },
      {
        "name": "Warfarina INR / control anticoagulación",
        "aka": "Levetiracetam (Keppra)",
        "costLow": 10,
        "costHigh": 40,
        "unit": "por mes",
        "extra": "Genérico abarata mucho vs. Keppra de marca.",
        "talkingPoint": "Anticonvulsivo genérico accesible que previene crisis peligrosas y caídas."
      },
      {
        "name": "Lamotrigina",
        "aka": "Lamotrigine (Lamictal)",
        "costLow": 4,
        "costHigh": 30,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Para epilepsia y ánimo, el genérico es barato; mantener el tratamiento evita recaídas costosas."
      },
      {
        "name": "Ácido valproico",
        "aka": "Valproic acid / Divalproex (Depakote)",
        "costLow": 10,
        "costHigh": 50,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Anticonvulsivo y estabilizador genérico; el seguro cubre los análisis de seguimiento."
      },
      {
        "name": "Hidroclorotiazida",
        "aka": "Hydrochlorothiazide (HCTZ)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por mes",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Diurético para presión casi gratis; controlar la hipertensión previene daño renal caro."
      },
      {
        "name": "Furosemida",
        "aka": "Furosemide (Lasix)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por mes",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Diurético genérico baratísimo clave en insuficiencia cardíaca; evita hospitalizaciones."
      },
      {
        "name": "Simvastatina",
        "aka": "Simvastatin (Zocor)",
        "costLow": 4,
        "costHigh": 18,
        "unit": "por mes",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Estatina genérica de las más baratas; el colesterol controlado previene infartos costosos."
      },
      {
        "name": "Pravastatina",
        "aka": "Pravastatin (Pravachol)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Otra estatina genérica económica; prevenir es siempre más barato que operar."
      },
      {
        "name": "Duloxetina",
        "aka": "Duloxetine (Cymbalta)",
        "costLow": 8,
        "costHigh": 40,
        "unit": "por mes",
        "extra": "Genérico abarata frente a Cymbalta.",
        "talkingPoint": "Para depresión y dolor crónico el genérico es accesible; la cobertura suma la terapia."
      },
      {
        "name": "Venlafaxina",
        "aka": "Venlafaxine (Effexor XR)",
        "costLow": 8,
        "costHigh": 40,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Antidepresivo genérico de bajo costo; no interrumpirlo evita recaídas y urgencias."
      },
      {
        "name": "Trazodona",
        "aka": "Trazodone (Desyrel)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Usada para insomnio y ánimo, es muy barata en genérico; dormir bien previene mucho."
      },
      {
        "name": "Citalopram",
        "aka": "Citalopram (Celexa)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Antidepresivo genérico accesible; la continuidad del tratamiento es lo que cuida la salud."
      },
      {
        "name": "Metilfenidato (Concerta / Ritalin)",
        "aka": "Methylphenidate (Concerta / Ritalin)",
        "costLow": 15,
        "costHigh": 90,
        "unit": "por mes",
        "extra": "Genérico ~$15-$40; controlado.",
        "talkingPoint": "El TDAH tratado mejora la productividad; el genérico cuesta mucho menos que la marca."
      },
      {
        "name": "Lorazepam",
        "aka": "Lorazepam (Ativan)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico; controlado.",
        "talkingPoint": "Ansiolítico genérico barato; el seguro cubre el seguimiento que requiere su uso."
      },
      {
        "name": "Clonazepam",
        "aka": "Clonazepam (Klonopin)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico; controlado.",
        "talkingPoint": "Para ansiedad y convulsiones, genérico accesible con control médico cubierto por seguro."
      },
      {
        "name": "Quetiapina",
        "aka": "Quetiapine (Seroquel)",
        "costLow": 8,
        "costHigh": 45,
        "unit": "por mes",
        "extra": "Genérico abarata mucho vs. Seroquel.",
        "talkingPoint": "Antipsicótico genérico accesible; mantener el tratamiento evita crisis y hospitalización."
      },
      {
        "name": "Aripiprazol",
        "aka": "Aripiprazole (Abilify)",
        "costLow": 10,
        "costHigh": 60,
        "unit": "por mes",
        "extra": "Genérico abarata enormemente vs. Abilify de marca.",
        "talkingPoint": "Ahora genérico y mucho más barato; la continuidad previene recaídas costosas."
      },
      {
        "name": "Tamsulosina",
        "aka": "Tamsulosin (Flomax)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Para próstata el genérico es barato; tratar a tiempo evita retención urinaria y urgencias."
      },
      {
        "name": "Finasterida",
        "aka": "Finasteride (Proscar / Propecia)",
        "costLow": 8,
        "costHigh": 30,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Genérico accesible para próstata y cabello; el chequeo prostático lo cubre el seguro."
      },
      {
        "name": "Sildenafil",
        "aka": "Sildenafil (Viagra)",
        "costLow": 8,
        "costHigh": 50,
        "unit": "por mes",
        "extra": "Genérico ~$8-$20 vs. Viagra de marca mucho más caro.",
        "talkingPoint": "El genérico cuesta una fracción de Viagra; la disfunción puede señalar riesgo cardíaco a chequear."
      },
      {
        "name": "Tadalafilo",
        "aka": "Tadalafil (Cialis)",
        "costLow": 10,
        "costHigh": 50,
        "unit": "por mes",
        "extra": "Genérico abarata mucho vs. Cialis.",
        "talkingPoint": "Genérico muy accesible frente a la marca; el seguro cubre el chequeo integral asociado."
      },
      {
        "name": "Ondansetrón",
        "aka": "Ondansetron (Zofran)",
        "costLow": 6,
        "costHigh": 30,
        "unit": "por envase",
        "extra": "Genérico abarata mucho vs. Zofran.",
        "talkingPoint": "Antináusea genérico económico; evita deshidratación y visitas a urgencias."
      },
      {
        "name": "Meloxicam",
        "aka": "Meloxicam (Mobic)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por mes",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Antiinflamatorio genérico barato para artritis; el seguro cubre el control articular."
      },
      {
        "name": "Naproxeno",
        "aka": "Naproxen (Aleve)",
        "costLow": 4,
        "costHigh": 15,
        "unit": "por envase",
        "extra": "Genérico/OTC muy barato.",
        "talkingPoint": "Antiinflamatorio OTC baratísimo; el chequeo con seguro descarta causas serias del dolor."
      },
      {
        "name": "Ciprofloxacino",
        "aka": "Ciprofloxacin (Cipro)",
        "costLow": 6,
        "costHigh": 30,
        "unit": "por tratamiento",
        "extra": "Genérico económico.",
        "talkingPoint": "Antibiótico genérico económico; tratar la infección a tiempo evita complicaciones graves."
      },
      {
        "name": "Trimetoprima/sulfametoxazol (Bactrim)",
        "aka": "Trimethoprim/sulfamethoxazole (Bactrim)",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por tratamiento",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Antibiótico muy barato para infecciones urinarias y de piel; prevenir su avance ahorra mucho."
      },
      {
        "name": "Prednisolona/dexametasona (corticoide)",
        "aka": "Dexamethasone",
        "costLow": 4,
        "costHigh": 20,
        "unit": "por tratamiento",
        "extra": "Genérico muy barato.",
        "talkingPoint": "Corticoide genérico baratísimo para inflamaciones agudas; el seguro cubre la evaluación."
      },
      {
        "name": "Hidroxizina",
        "aka": "Hydroxyzine (Atarax / Vistaril)",
        "costLow": 4,
        "costHigh": 25,
        "unit": "por mes",
        "extra": "Genérico económico.",
        "talkingPoint": "Para ansiedad y alergia, genérico accesible; una opción no adictiva que el médico ajusta."
      },
      {
        "name": "Insulina degludec/detemir (basal)",
        "aka": "Insulin detemir (Levemir)",
        "costLow": 80,
        "costHigh": 350,
        "unit": "por mes",
        "extra": "Sin seguro puede superar los $300/mes.",
        "talkingPoint": "Toda insulina basal es un gasto recurrente alto sin seguro; la cobertura lo hace sostenible."
      },
      {
        "name": "Empagliflozina/otras (Farxiga)",
        "aka": "Dapagliflozin (Farxiga)",
        "costLow": 500,
        "costHigh": 650,
        "unit": "por mes",
        "extra": "Sin genérico; precio de lista ~$600.",
        "talkingPoint": "Otro protector cardio-renal sin genérico que cuesta cientos al mes sin seguro."
      },
      {
        "name": "Tiotropio (Spiriva)",
        "aka": "Tiotropium (Spiriva)",
        "costLow": 400,
        "costHigh": 600,
        "unit": "por envase",
        "extra": "Sin genérico ampliamente disponible; precio alto.",
        "talkingPoint": "Inhalador de EPOC sin genérico costoso; controlar la enfermedad evita ingresos repetidos."
      },
      {
        "name": "Rivaroxabán (Xarelto)",
        "aka": "Rivaroxaban (Xarelto)",
        "costLow": 550,
        "costHigh": 650,
        "unit": "por mes",
        "extra": "Sin genérico aún; precio de lista ~$600.",
        "talkingPoint": "Anticoagulante sin genérico que sin seguro supera $500 al mes; previene coágulos peligrosos."
      }
    ]
  },
  {
    "id": "consultas",
    "title": "Consultas y urgencias",
    "items": [
      {
        "name": "Visita a médico general",
        "aka": "Primary care / PCP office visit (CPT 99203-99213)",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "Muchas clínicas ofrecen descuento self-pay del 20-40%.",
        "talkingPoint": "Con seguro esta visita suele costar solo un copago; sin seguro pagas todo de tu bolsillo."
      },
      {
        "name": "Visita a médico especialista",
        "aka": "Specialist consultation (cardiology, neurology, etc.)",
        "costLow": 200,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "La primera consulta suele ser más cara que las de seguimiento.",
        "talkingPoint": "Un seguro te da acceso a especialistas por un copago fijo en vez de cientos de dólares."
      },
      {
        "name": "Clínica de urgencias (urgent care)",
        "aka": "Urgent care walk-in visit",
        "costLow": 160,
        "costHigh": 350,
        "unit": "por visita",
        "extra": "Servicios complejos (suturas, radiografías) suben el total a $250-$450.",
        "talkingPoint": "El urgent care es 10 veces más barato que urgencias; con seguro pagas casi nada."
      },
      {
        "name": "Sala de emergencias - Nivel 1 (leve)",
        "aka": "Emergency room level 1 (CPT 99281)",
        "costLow": 150,
        "costHigh": 600,
        "unit": "por visita",
        "extra": "Precio antes de análisis, imágenes o procedimientos.",
        "talkingPoint": "Incluso la urgencia más leve sin seguro cuesta más que un mes de prima."
      },
      {
        "name": "Sala de emergencias - Nivel 2 (bajo)",
        "aka": "Emergency room level 2 (CPT 99282)",
        "costLow": 300,
        "costHigh": 900,
        "unit": "por visita",
        "extra": "No incluye laboratorio ni radiología.",
        "talkingPoint": "Una prima mensual cuesta menos que esta factura de urgencias."
      },
      {
        "name": "Sala de emergencias - Nivel 3 (moderado)",
        "aka": "Emergency room level 3 (CPT 99283)",
        "costLow": 500,
        "costHigh": 1500,
        "unit": "por visita",
        "extra": "El nivel se asigna según complejidad del caso.",
        "talkingPoint": "Con seguro tu gasto máximo está topado; sin seguro no hay límite."
      },
      {
        "name": "Sala de emergencias - Nivel 4 (alto)",
        "aka": "Emergency room level 4 (CPT 99284)",
        "costLow": 900,
        "costHigh": 3000,
        "unit": "por visita",
        "extra": "Antes de sumar TAC, análisis o medicamentos.",
        "talkingPoint": "Una sola visita grave sin seguro puede arruinar tus ahorros."
      },
      {
        "name": "Sala de emergencias - Nivel 5 (crítico)",
        "aka": "Emergency room level 5 (CPT 99285)",
        "costLow": 2000,
        "costHigh": 5000,
        "unit": "por visita",
        "extra": "Puede superar $5,000 antes de estudios y procedimientos.",
        "talkingPoint": "Las emergencias críticas son la razón número uno para tener seguro."
      },
      {
        "name": "Consulta por telemedicina",
        "aka": "Telehealth / virtual doctor visit",
        "costLow": 40,
        "costHigh": 100,
        "unit": "por visita",
        "extra": "Hasta 3 veces más barata que el urgent care.",
        "talkingPoint": "Muchos seguros incluyen telemedicina gratis o casi gratis las 24 horas."
      },
      {
        "name": "Ambulancia terrestre básica (BLS)",
        "aka": "Ground ambulance BLS transport",
        "costLow": 500,
        "costHigh": 1500,
        "unit": "por procedimiento",
        "extra": "Se cobra tarifa base más millaje.",
        "talkingPoint": "Las ambulancias terrestres no están protegidas por la ley federal; el seguro sí ayuda."
      },
      {
        "name": "Ambulancia terrestre avanzada (ALS)",
        "aka": "Ground ambulance ALS emergency transport",
        "costLow": 1000,
        "costHigh": 2500,
        "unit": "por procedimiento",
        "extra": "El soporte vital avanzado cuesta más que el básico.",
        "talkingPoint": "Un traslado de emergencia puede costar como un mes de renta; el seguro lo cubre."
      },
      {
        "name": "Ambulancia aérea en helicóptero",
        "aka": "Air ambulance helicopter transport",
        "costLow": 20000,
        "costHigh": 50000,
        "unit": "por procedimiento",
        "extra": "Cargo mediano facturado alrededor de $38,000.",
        "talkingPoint": "Un vuelo de rescate sin seguro cuesta más que un carro nuevo."
      },
      {
        "name": "Ambulancia aérea de ala fija",
        "aka": "Air ambulance fixed-wing transport",
        "costLow": 15000,
        "costHigh": 80000,
        "unit": "por procedimiento",
        "extra": "Cubierta por la No Surprises Act si tienes seguro.",
        "talkingPoint": "Traslados de larga distancia sin seguro pueden llegar a $100,000."
      },
      {
        "name": "Clínica minorista (CVS/Walgreens)",
        "aka": "Retail clinic (MinuteClinic) visit",
        "costLow": 60,
        "costHigh": 150,
        "unit": "por visita",
        "extra": "Tope self-pay alrededor de $199 por visita.",
        "talkingPoint": "Ideal para cosas menores, pero el seguro te evita pagar cada visita."
      },
      {
        "name": "Segunda opinión médica",
        "aka": "Second opinion consultation",
        "costLow": 200,
        "costHigh": 700,
        "unit": "por visita",
        "extra": "Servicios en línea de centros especializados cuestan más.",
        "talkingPoint": "Con seguro puedes buscar una segunda opinión sin pagar de más."
      },
      {
        "name": "Visita médica a domicilio",
        "aka": "House call / at-home doctor visit",
        "costLow": 200,
        "costHigh": 900,
        "unit": "por visita",
        "extra": "Algunos usan membresía de $250/mes o más.",
        "talkingPoint": "La comodidad de casa sale cara sin cobertura; el seguro reduce el gasto."
      },
      {
        "name": "Examen físico escolar/deportivo",
        "aka": "School / sports physical exam",
        "costLow": 50,
        "costHigh": 100,
        "unit": "por visita",
        "extra": "Básico ronda los $76 en muchas clínicas.",
        "talkingPoint": "Con seguro los chequeos preventivos suelen ser gratis."
      },
      {
        "name": "Consulta de urgencia dental",
        "aka": "Emergency dental visit (exam + X-ray)",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por visita",
        "extra": "El tratamiento suma; total típico $300-$600.",
        "talkingPoint": "Un seguro dental convierte una emergencia costosa en un copago."
      },
      {
        "name": "Examen físico anual completo",
        "aka": "Annual physical / wellness exam",
        "costLow": 150,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "Los análisis de laboratorio pueden ser aparte.",
        "talkingPoint": "La prevención anual es gratis con la mayoría de los seguros."
      },
      {
        "name": "Visita de seguimiento",
        "aka": "Follow-up office visit",
        "costLow": 75,
        "costHigh": 200,
        "unit": "por visita",
        "extra": "Más barata que la consulta inicial.",
        "talkingPoint": "Las visitas de seguimiento se acumulan; con seguro pagas solo el copago."
      },
      {
        "name": "Consulta pediátrica",
        "aka": "Pediatric office visit",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por visita",
        "extra": "Chequeos de niño sano suelen ser gratis con seguro.",
        "talkingPoint": "Los niños se enferman seguido; un seguro cubre sus visitas sin sorpresas."
      },
      {
        "name": "Consulta de salud mental (primera visita)",
        "aka": "Psychiatry / behavioral health intake",
        "costLow": 150,
        "costHigh": 500,
        "unit": "por sesión",
        "extra": "Las sesiones de seguimiento suelen costar menos.",
        "talkingPoint": "La salud mental está cubierta por ley en los planes ACA con seguro."
      },
      {
        "name": "Consulta de dermatología",
        "aka": "Dermatology office visit",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Biopsias y procedimientos se cobran aparte.",
        "talkingPoint": "Detectar a tiempo un lunar sospechoso es más barato con seguro."
      },
      {
        "name": "Clínica comunitaria (escala móvil)",
        "aka": "Community health center / FQHC sliding scale",
        "costLow": 35,
        "costHigh": 200,
        "unit": "por visita",
        "extra": "Tarifa según ingresos; ideal sin seguro.",
        "talkingPoint": "Existen opciones económicas, pero el seguro amplía tu acceso a especialistas."
      }
    ]
  },
  {
    "id": "especialistas",
    "title": "Especialistas",
    "items": [
      {
        "name": "Consulta con urólogo",
        "aka": "Urologist consultation (new patient)",
        "costLow": 200,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Primera visita más cara que seguimiento; estudios como uroflujometría o cistoscopia se cobran aparte",
        "talkingPoint": "Una consulta urológica preventiva cuesta cientos sin seguro; con cobertura detectas problemas de próstata a tiempo y casi sin costo."
      },
      {
        "name": "Consulta con anestesiólogo (evaluación preoperatoria)",
        "aka": "Anesthesiologist pre-op consult",
        "costLow": 150,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "El honorario del acto anestésico en cirugía se factura por separado (cientos a miles)",
        "talkingPoint": "La evaluación anestésica es solo el inicio; el seguro absorbe el gran costo de la anestesia en quirófano."
      },
      {
        "name": "Consulta con psicólogo",
        "aka": "Psychologist therapy session",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por sesión",
        "extra": "Psicólogo (PhD/PsyD) $150-$250; consejero/terapeuta desde $80; algunos ofrecen escala móvil",
        "talkingPoint": "Sin seguro cada sesión sale de tu bolsillo; con cobertura de salud mental la terapia continua se vuelve accesible."
      },
      {
        "name": "Consulta con psiquiatra (evaluación inicial)",
        "aka": "Psychiatrist initial evaluation",
        "costLow": 250,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Seguimientos $100-$300; el psiquiatra receta medicación, por eso cobra más que un terapeuta",
        "talkingPoint": "La evaluación psiquiátrica inicial es de las más caras; asegúrate y accede a diagnóstico y medicación sin descapitalizarte."
      },
      {
        "name": "Consulta con pediatra",
        "aka": "Pediatrician office visit",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "Chequeo de niño sano suele estar 100% cubierto como preventivo; vacunas aparte",
        "talkingPoint": "Los niños enferman seguido; con seguro los controles y vacunas del pediatra salen sin costo y tú evitas facturas repetidas."
      },
      {
        "name": "Consulta con cardiólogo",
        "aka": "Cardiologist consultation",
        "costLow": 200,
        "costHigh": 600,
        "unit": "por visita",
        "extra": "Especialista complejo; ecocardiograma (~$500+) o EKG ($50-$150) se cobran aparte",
        "talkingPoint": "Un chequeo cardíaco a tiempo previene un infarto que costaría decenas de miles; el seguro hace que cuidar tu corazón sea barato."
      },
      {
        "name": "Consulta con dermatólogo",
        "aka": "Dermatologist visit",
        "costLow": 150,
        "costHigh": 350,
        "unit": "por visita",
        "extra": "Seguimiento $100-$200; biopsia de piel o crioterapia se facturan por separado",
        "talkingPoint": "Detectar un lunar sospechoso a tiempo cuesta poco con seguro; tratar un melanoma avanzado cuesta una fortuna."
      },
      {
        "name": "Consulta con ortopedista",
        "aka": "Orthopedic surgeon consultation",
        "costLow": 200,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Radiografías o infiltración articular ($100-$500) se cobran aparte",
        "talkingPoint": "Una lesión de rodilla o espalda mal atendida termina en cirugía costosa; con seguro atiendes a tiempo y pagas poco."
      },
      {
        "name": "Consulta con oncólogo",
        "aka": "Oncologist consultation",
        "costLow": 300,
        "costHigh": 700,
        "unit": "por visita",
        "extra": "Solo la consulta; quimioterapia y estudios suman decenas de miles al año",
        "talkingPoint": "El cáncer es la prueba máxima de por qué tener seguro: sin él, solo las consultas y estudios te arruinan."
      },
      {
        "name": "Consulta con ginecólogo/obstetra",
        "aka": "OB-GYN consultation",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Papanicolaou y control prenatal preventivo suelen estar cubiertos al 100%",
        "talkingPoint": "El chequeo ginecológico anual es preventivo y gratis con seguro; sin él pagas cada visita y cada prueba."
      },
      {
        "name": "Consulta con neurólogo",
        "aka": "Neurologist consultation",
        "costLow": 250,
        "costHigh": 600,
        "unit": "por visita",
        "extra": "Estudios como EEG o electromiografía se cobran aparte (cientos c/u)",
        "talkingPoint": "Migrañas, mareos o entumecimientos merecen evaluación; con seguro ves al neurólogo sin temer la factura."
      },
      {
        "name": "Consulta con endocrinólogo",
        "aka": "Endocrinologist consultation",
        "costLow": 200,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Manejo de diabetes o tiroides requiere visitas frecuentes y análisis de sangre aparte",
        "talkingPoint": "La diabetes bien controlada evita complicaciones carísimas; el seguro cubre las visitas frecuentes que necesitas."
      },
      {
        "name": "Consulta con gastroenterólogo",
        "aka": "Gastroenterologist consultation",
        "costLow": 250,
        "costHigh": 650,
        "unit": "por visita",
        "extra": "Promedio nacional ~$355 nueva visita; endoscopia/colonoscopia se cobran aparte (miles)",
        "talkingPoint": "La colonoscopia preventiva salva vidas y con seguro suele ser gratis; sin cobertura solo la consulta ya duele."
      },
      {
        "name": "Consulta con nefrólogo",
        "aka": "Nephrologist consultation",
        "costLow": 200,
        "costHigh": 550,
        "unit": "por visita",
        "extra": "Enfermedad renal crónica exige seguimiento continuo; diálisis cuesta decenas de miles al año",
        "talkingPoint": "Cuidar tus riñones a tiempo con seguro evita la diálisis, uno de los tratamientos más caros que existen."
      },
      {
        "name": "Consulta con neumólogo",
        "aka": "Pulmonologist consultation",
        "costLow": 200,
        "costHigh": 550,
        "unit": "por visita",
        "extra": "Espirometría o pruebas de función pulmonar se cobran aparte",
        "talkingPoint": "Asma o EPOC bien manejados evitan hospitalizaciones; con seguro las visitas al neumólogo son accesibles."
      },
      {
        "name": "Consulta con reumatólogo",
        "aka": "Rheumatologist consultation",
        "costLow": 250,
        "costHigh": 600,
        "unit": "por visita",
        "extra": "Enfermedades autoinmunes requieren fármacos biológicos costosísimos y monitoreo",
        "talkingPoint": "La artritis y el lupus necesitan tratamiento de por vida; el seguro hace viable el costoso manejo continuo."
      },
      {
        "name": "Consulta con otorrinolaringólogo (ENT)",
        "aka": "Otolaryngologist / ENT consultation",
        "costLow": 150,
        "costHigh": 450,
        "unit": "por visita",
        "extra": "Audiometría o nasolaringoscopia se cobran aparte",
        "talkingPoint": "Problemas de oído, nariz o garganta se resuelven mejor temprano; con seguro consultas al especialista sin pensarlo."
      },
      {
        "name": "Consulta con oftalmólogo",
        "aka": "Ophthalmologist consultation",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Examen de retina o campimetría aparte; distinto de la simple graduación del optometrista",
        "talkingPoint": "Detectar glaucoma o retinopatía a tiempo salva tu vista; con seguro el examen ocular es barato y rutinario."
      },
      {
        "name": "Consulta con alergólogo",
        "aka": "Allergist / Immunologist consultation",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Panel de pruebas cutáneas de alergia se cobra aparte ($200-$1,000+)",
        "talkingPoint": "Identificar tus alergias con seguro cuesta poco; las pruebas completas sin cobertura suman cientos o miles."
      },
      {
        "name": "Consulta con hematólogo",
        "aka": "Hematologist consultation",
        "costLow": 250,
        "costHigh": 600,
        "unit": "por visita",
        "extra": "Estudios de sangre especializados y de médula ósea se cobran aparte",
        "talkingPoint": "Trastornos de la sangre requieren monitoreo constante; el seguro cubre las visitas y análisis frecuentes."
      },
      {
        "name": "Consulta con cirujano general",
        "aka": "General surgeon consultation",
        "costLow": 200,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Solo la consulta; la cirugía (hernia, vesícula, etc.) cuesta miles adicionales",
        "talkingPoint": "La consulta quirúrgica es lo barato; el seguro te protege del verdadero costo del quirófano."
      },
      {
        "name": "Consulta con cirujano plástico",
        "aka": "Plastic surgeon consultation",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "Estética no la cubre el seguro; reconstructiva (post-mastectomía, quemaduras) sí suele cubrirse",
        "talkingPoint": "La cirugía reconstructiva médicamente necesaria sí la cubre tu seguro; sin él pagarías todo de tu bolsillo."
      },
      {
        "name": "Consulta con fisiatra (medicina física y rehabilitación)",
        "aka": "Physiatrist / PM&R consultation",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Las sesiones de terapia física que indica se cobran aparte ($50-$150 c/u)",
        "talkingPoint": "Recuperarte de una lesión requiere muchas sesiones; con seguro la rehabilitación completa es asequible."
      },
      {
        "name": "Consulta con geriatra",
        "aka": "Geriatrician consultation",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Manejo integral del adulto mayor con múltiples condiciones y medicamentos",
        "talkingPoint": "El cuidado especializado del adulto mayor requiere visitas frecuentes que el seguro cubre sin vaciar el ahorro."
      },
      {
        "name": "Consulta con podólogo",
        "aka": "Podiatrist consultation",
        "costLow": 60,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Muchos dan 20-40% de descuento a self-pay; cirugías de pie de $400 a $12,000",
        "talkingPoint": "El pie diabético mal cuidado lleva a cirugías costosísimas; con seguro las revisiones podológicas son baratas."
      },
      {
        "name": "Consulta con infectólogo",
        "aka": "Infectious disease specialist consultation",
        "costLow": 200,
        "costHigh": 550,
        "unit": "por visita",
        "extra": "Manejo de VIH, hepatitis o infecciones resistentes exige seguimiento y fármacos caros",
        "talkingPoint": "Las infecciones complejas requieren medicamentos costosos y monitoreo; el seguro hace posible el tratamiento."
      },
      {
        "name": "Consulta con nutricionista/dietista",
        "aka": "Registered dietitian / nutritionist consult",
        "costLow": 70,
        "costHigh": 200,
        "unit": "por sesión",
        "extra": "Inicial 60-90 min $70-$200; seguimientos $50-$150; muchos planes la cubren como preventiva",
        "talkingPoint": "La orientación nutricional previene diabetes y obesidad; muchos seguros la cubren gratis como servicio preventivo."
      },
      {
        "name": "Consulta con oncólogo radioterápico",
        "aka": "Radiation oncologist consultation",
        "costLow": 300,
        "costHigh": 700,
        "unit": "por visita",
        "extra": "Un ciclo completo de radioterapia cuesta decenas de miles",
        "talkingPoint": "La radioterapia contra el cáncer es de los tratamientos más costosos; sin seguro es simplemente inalcanzable."
      },
      {
        "name": "Consulta con neurocirujano",
        "aka": "Neurosurgeon consultation",
        "costLow": 300,
        "costHigh": 700,
        "unit": "por visita",
        "extra": "Solo la evaluación; una cirugía de columna o cerebro cuesta decenas a cientos de miles",
        "talkingPoint": "Nadie ahorra para una cirugía cerebral; el seguro es lo que separa el tratamiento de la ruina financiera."
      },
      {
        "name": "Consulta con cirujano cardiovascular",
        "aka": "Cardiothoracic / cardiovascular surgeon consult",
        "costLow": 300,
        "costHigh": 700,
        "unit": "por visita",
        "extra": "Un bypass o cirugía valvular supera los $100,000 sin seguro",
        "talkingPoint": "Una cirugía de corazón sin seguro cuesta más que una casa; asegurarte es literalmente proteger tu vida y tu patrimonio."
      },
      {
        "name": "Consulta con cirujano vascular",
        "aka": "Vascular surgeon consultation",
        "costLow": 250,
        "costHigh": 600,
        "unit": "por visita",
        "extra": "Estudios como eco-Doppler arterial se cobran aparte",
        "talkingPoint": "Problemas de circulación no tratados llevan a amputaciones; con seguro atiendes a tiempo y a bajo costo."
      },
      {
        "name": "Consulta con médico del dolor (algología)",
        "aka": "Pain management specialist consultation",
        "costLow": 200,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Infiltraciones o bloqueos nerviosos se cobran aparte ($300-$2,000 c/u)",
        "talkingPoint": "El dolor crónico exige tratamiento continuo; con seguro accedes a inyecciones y manejo especializado sin quebrarte."
      },
      {
        "name": "Consulta con internista (medicina interna)",
        "aka": "Internal medicine / internist visit",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Coordina el manejo de adultos con varias condiciones crónicas a la vez",
        "talkingPoint": "Un internista que coordina tu salud evita hospitalizaciones; el chequeo anual suele ser gratis con seguro."
      },
      {
        "name": "Consulta con cirujano colorrectal (proctólogo)",
        "aka": "Colorectal surgeon / proctologist consultation",
        "costLow": 200,
        "costHigh": 550,
        "unit": "por visita",
        "extra": "Anoscopia o procedimientos de hemorroides se cobran aparte",
        "talkingPoint": "Detectar cáncer colorrectal temprano lo hace curable y barato; el seguro cubre el tamizaje que sin él evitarías por costo."
      }
    ]
  },
  {
    "id": "imagenes",
    "title": "Estudios de imagen",
    "items": [
      {
        "name": "Radiografía de tórax",
        "aka": "Chest X-ray (CXR)",
        "costLow": 100,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "Más barato en centro de imágenes que en hospital; suele ser 1-2 proyecciones.",
        "talkingPoint": "Un estudio básico ya cuesta cientos sin seguro; asegurarte lo vuelve casi gratis en prevención."
      },
      {
        "name": "Radiografía de mano",
        "aka": "Hand X-ray",
        "costLow": 100,
        "costHigh": 900,
        "unit": "por estudio",
        "extra": "Precio por región; el precio de lista hospitalario dispara la factura.",
        "talkingPoint": "Una caída y una placa de mano ya son un gasto evitable con cobertura."
      },
      {
        "name": "Radiografía de tobillo",
        "aka": "Ankle X-ray",
        "costLow": 100,
        "costHigh": 900,
        "unit": "por estudio",
        "extra": "Común en urgencias por esguinces; en urgencias el costo sube.",
        "talkingPoint": "El seguro convierte una torcedura de tobillo en un copago, no en una factura de urgencias."
      },
      {
        "name": "Radiografía de pie",
        "aka": "Foot X-ray",
        "costLow": 100,
        "costHigh": 900,
        "unit": "por estudio",
        "extra": "Suele incluir varias proyecciones en un solo cargo.",
        "talkingPoint": "Detectar una fractura de pie a tiempo evita complicaciones y facturas mayores."
      },
      {
        "name": "Radiografía de rodilla",
        "aka": "Knee X-ray",
        "costLow": 100,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "A menudo el primer paso antes de una MRI mucho más cara.",
        "talkingPoint": "Con seguro empiezas por la placa barata y evitas gastos innecesarios en imagen avanzada."
      },
      {
        "name": "Radiografía de cadera",
        "aka": "Hip X-ray",
        "costLow": 100,
        "costHigh": 1200,
        "unit": "por estudio",
        "extra": "Frecuente en adultos mayores tras caídas.",
        "talkingPoint": "Prevenir caídas y tener cobertura evita facturas que se acumulan con la edad."
      },
      {
        "name": "Radiografía de columna",
        "aka": "Spine X-ray",
        "costLow": 150,
        "costHigh": 1500,
        "unit": "por estudio",
        "extra": "El costo varía según región (cervical, dorsal o lumbar) y número de vistas.",
        "talkingPoint": "El dolor de espalda es de lo más común; el seguro te ahorra cientos en cada estudio."
      },
      {
        "name": "Radiografía abdominal",
        "aka": "Abdominal X-ray (KUB)",
        "costLow": 100,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "Útil para obstrucción o cálculos; barata frente a la TAC.",
        "talkingPoint": "Con cobertura, el diagnóstico inicial de un dolor abdominal no te descuadra el bolsillo."
      },
      {
        "name": "Radiografía dental panorámica",
        "aka": "Panoramic dental X-ray (OPG)",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por estudio",
        "extra": "Suele hacerse en consultorio dental, más económico.",
        "talkingPoint": "La prevención dental con cobertura evita tratamientos costosos más adelante."
      },
      {
        "name": "Resonancia magnética de cerebro",
        "aka": "Brain MRI",
        "costLow": 500,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "Con contraste cuesta más; centro ambulatorio mucho más barato que hospital.",
        "talkingPoint": "Una MRI cerebral sin seguro puede costar miles; con póliza es una fracción."
      },
      {
        "name": "Resonancia magnética de rodilla",
        "aka": "Knee MRI",
        "costLow": 400,
        "costHigh": 3500,
        "unit": "por estudio",
        "extra": "De las MRI más solicitadas por lesiones deportivas.",
        "talkingPoint": "Las lesiones de rodilla son frecuentes; el seguro te evita pagar miles por la imagen."
      },
      {
        "name": "Resonancia magnética de columna lumbar",
        "aka": "Lumbar spine MRI",
        "costLow": 500,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "Estándar ante ciática o hernia discal.",
        "talkingPoint": "El dolor lumbar crónico requiere imagen cara; asegurarte la vuelve accesible."
      },
      {
        "name": "Resonancia magnética de columna cervical",
        "aka": "Cervical spine MRI",
        "costLow": 500,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "Indicada por dolor cervical con irradiación a brazos.",
        "talkingPoint": "Con seguro, estudiar un pinzamiento cervical no cuesta miles de tu bolsillo."
      },
      {
        "name": "Resonancia magnética de hombro",
        "aka": "Shoulder MRI",
        "costLow": 500,
        "costHigh": 4000,
        "unit": "por estudio",
        "extra": "Detecta desgarros del manguito rotador.",
        "talkingPoint": "Un hombro lesionado bien diagnosticado a tiempo evita cirugías más caras."
      },
      {
        "name": "Resonancia magnética de abdomen",
        "aka": "Abdominal MRI",
        "costLow": 500,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "A menudo con contraste para hígado o vías biliares.",
        "talkingPoint": "El seguro cubre la imagen avanzada que sin póliza cuesta miles."
      },
      {
        "name": "Resonancia magnética de pelvis",
        "aka": "Pelvic MRI",
        "costLow": 500,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "Evalúa útero, próstata o articulación de cadera.",
        "talkingPoint": "Prevenir y diagnosticar a tiempo problemas pélvicos es mucho más barato con cobertura."
      },
      {
        "name": "Resonancia magnética cardíaca",
        "aka": "Cardiac MRI",
        "costLow": 1000,
        "costHigh": 7000,
        "unit": "por estudio",
        "extra": "Estudio especializado, casi siempre hospitalario.",
        "talkingPoint": "Un estudio cardíaco avanzado sin seguro puede superar los 5.000 dólares."
      },
      {
        "name": "Resonancia magnética de mama",
        "aka": "Breast MRI",
        "costLow": 1000,
        "costHigh": 6000,
        "unit": "por estudio",
        "extra": "Usada en detección de alto riesgo; complementa la mamografía.",
        "talkingPoint": "La detección temprana de cáncer de mama salva vidas y dinero; el seguro la hace posible."
      },
      {
        "name": "Angiografía por resonancia (MRA)",
        "aka": "MR angiography (MRA)",
        "costLow": 500,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "Evalúa vasos sin cateterismo; alternativa no invasiva.",
        "talkingPoint": "Con seguro accedes a estudios vasculares que sin cobertura cuestan miles."
      },
      {
        "name": "Tomografía computarizada de cabeza",
        "aka": "Head CT",
        "costLow": 300,
        "costHigh": 3000,
        "unit": "por estudio",
        "extra": "Rápida en urgencias por traumatismo; hospital cobra más.",
        "talkingPoint": "Un golpe en la cabeza y una TAC de urgencias ya son miles sin seguro."
      },
      {
        "name": "Tomografía computarizada de tórax",
        "aka": "Chest CT",
        "costLow": 300,
        "costHigh": 4000,
        "unit": "por estudio",
        "extra": "Autopago promedio ~700 dólares en centro ambulatorio.",
        "talkingPoint": "El seguro cubre la TAC de tórax que detecta problemas pulmonares a tiempo."
      },
      {
        "name": "Tomografía computarizada de abdomen y pelvis",
        "aka": "Abdomen/pelvis CT",
        "costLow": 500,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "Frecuente en dolor abdominal agudo; con contraste sube.",
        "talkingPoint": "Una TAC abdominal en urgencias sin seguro puede costar miles en un solo día."
      },
      {
        "name": "Angiografía por tomografía (Angio-TAC)",
        "aka": "CT angiography (CTA)",
        "costLow": 1000,
        "costHigh": 6000,
        "unit": "por estudio",
        "extra": "Evalúa arterias con contraste; más cara que la TAC simple.",
        "talkingPoint": "Los estudios vasculares avanzados son costosísimos sin cobertura."
      },
      {
        "name": "Tomografía de senos paranasales",
        "aka": "Sinus CT",
        "costLow": 300,
        "costHigh": 2000,
        "unit": "por estudio",
        "extra": "Común en sinusitis crónica antes de cirugía.",
        "talkingPoint": "Diagnosticar sinusitis crónica con cobertura evita gastos de bolsillo repetidos."
      },
      {
        "name": "Tomografía de columna",
        "aka": "Spine CT",
        "costLow": 400,
        "costHigh": 3000,
        "unit": "por estudio",
        "extra": "Alternativa a MRI cuando esta no es posible.",
        "talkingPoint": "Con seguro, el estudio de columna que necesitas no se convierte en deuda."
      },
      {
        "name": "Puntaje de calcio coronario",
        "aka": "Coronary calcium score CT",
        "costLow": 100,
        "costHigh": 500,
        "unit": "por estudio",
        "extra": "TAC preventiva de bajo costo; muchas veces autopago.",
        "talkingPoint": "Por poco dinero mides tu riesgo cardíaco; la prevención es la mejor inversión."
      },
      {
        "name": "Ecografía abdominal",
        "aka": "Abdominal ultrasound",
        "costLow": 200,
        "costHigh": 1200,
        "unit": "por estudio",
        "extra": "Sin radiación; evalúa hígado, vesícula y riñones.",
        "talkingPoint": "Un estudio sencillo y sin radiación que el seguro cubre para detectar a tiempo."
      },
      {
        "name": "Ecografía pélvica",
        "aka": "Pelvic ultrasound",
        "costLow": 200,
        "costHigh": 1200,
        "unit": "por estudio",
        "extra": "Transabdominal o transvaginal; evalúa útero y ovarios.",
        "talkingPoint": "La salud pélvica preventiva es más barata con cobertura que pagar cada estudio."
      },
      {
        "name": "Ecografía tiroidea",
        "aka": "Thyroid ultrasound",
        "costLow": 150,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "Detecta nódulos tiroideos; muy común.",
        "talkingPoint": "Vigilar la tiroides a tiempo con seguro evita complicaciones costosas."
      },
      {
        "name": "Ecografía obstétrica",
        "aka": "Obstetric (pregnancy) ultrasound",
        "costLow": 200,
        "costHigh": 1200,
        "unit": "por estudio",
        "extra": "Varios estudios durante el embarazo; el costo se acumula.",
        "talkingPoint": "El embarazo implica múltiples ecografías; el seguro evita que se acumulen en deuda."
      },
      {
        "name": "Ecografía Doppler de carótida",
        "aka": "Carotid Doppler ultrasound",
        "costLow": 250,
        "costHigh": 1500,
        "unit": "por estudio",
        "extra": "Evalúa riesgo de accidente cerebrovascular.",
        "talkingPoint": "Prevenir un derrame con un estudio cubierto es infinitamente más barato que tratarlo."
      },
      {
        "name": "Ecografía Doppler venoso",
        "aka": "Venous Doppler ultrasound",
        "costLow": 250,
        "costHigh": 1500,
        "unit": "por estudio",
        "extra": "Descarta trombosis venosa profunda en piernas.",
        "talkingPoint": "Un coágulo detectado a tiempo con cobertura evita una emergencia grave y cara."
      },
      {
        "name": "Ecografía mamaria",
        "aka": "Breast ultrasound",
        "costLow": 150,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "Complementa la mamografía en tejido denso.",
        "talkingPoint": "La detección temprana de mama con cobertura protege tu salud y tu bolsillo."
      },
      {
        "name": "Ecografía escrotal",
        "aka": "Scrotal ultrasound",
        "costLow": 200,
        "costHigh": 1100,
        "unit": "por estudio",
        "extra": "Evalúa dolor o masas testiculares.",
        "talkingPoint": "Diagnosticar a tiempo con seguro evita gastos y preocupaciones mayores."
      },
      {
        "name": "Ecografía renal",
        "aka": "Renal (kidney) ultrasound",
        "costLow": 200,
        "costHigh": 1100,
        "unit": "por estudio",
        "extra": "Detecta cálculos o quistes renales sin radiación.",
        "talkingPoint": "Vigilar tus riñones con cobertura previene tratamientos renales muy costosos."
      },
      {
        "name": "Mamografía de detección",
        "aka": "Screening mammogram",
        "costLow": 100,
        "costHigh": 400,
        "unit": "por estudio",
        "extra": "Preventiva anual; muchos planes la cubren al 100%.",
        "talkingPoint": "La mamografía preventiva suele ser gratis con seguro y salva vidas."
      },
      {
        "name": "Mamografía diagnóstica",
        "aka": "Diagnostic mammogram",
        "costLow": 150,
        "costHigh": 600,
        "unit": "por estudio",
        "extra": "Se indica ante hallazgos; más cara que la de detección.",
        "talkingPoint": "Confirmar un hallazgo a tiempo con cobertura es clave para tratar temprano."
      },
      {
        "name": "Densitometría ósea (DEXA)",
        "aka": "Bone density scan (DEXA)",
        "costLow": 75,
        "costHigh": 300,
        "unit": "por estudio",
        "extra": "Estudio de bajo costo para osteoporosis.",
        "talkingPoint": "Detectar osteoporosis temprano con cobertura previene fracturas costosas."
      },
      {
        "name": "PET scan",
        "aka": "PET scan (positron emission tomography)",
        "costLow": 1300,
        "costHigh": 6000,
        "unit": "por estudio",
        "extra": "Clave en oncología; de los estudios más caros.",
        "talkingPoint": "Un PET puede costar miles; sin seguro el diagnóstico de cáncer se vuelve una carga enorme."
      },
      {
        "name": "Ecocardiograma",
        "aka": "Echocardiogram (echo)",
        "costLow": 200,
        "costHigh": 2500,
        "unit": "por estudio",
        "extra": "Ecografía del corazón; hospital cobra más que consultorio.",
        "talkingPoint": "Vigilar tu corazón con cobertura evita facturas de miles por cada estudio."
      },
      {
        "name": "Ecocardiograma de estrés",
        "aka": "Stress echocardiogram",
        "costLow": 500,
        "costHigh": 4000,
        "unit": "por estudio",
        "extra": "Combina ejercicio con ecografía cardíaca.",
        "talkingPoint": "Evaluar tu corazón bajo esfuerzo con seguro es prevención que ahorra miles."
      },
      {
        "name": "Prueba de esfuerzo nuclear",
        "aka": "Nuclear stress test (myocardial perfusion)",
        "costLow": 600,
        "costHigh": 5000,
        "unit": "por estudio",
        "extra": "Usa material radiactivo; más cara que la prueba básica.",
        "talkingPoint": "Un estudio cardíaco nuclear sin seguro puede llegar a 5.000 dólares."
      },
      {
        "name": "Prueba de esfuerzo con electrocardiograma",
        "aka": "Exercise stress test (treadmill EKG)",
        "costLow": 200,
        "costHigh": 1500,
        "unit": "por estudio",
        "extra": "Versión básica sin imagen nuclear; más económica.",
        "talkingPoint": "Chequear tu corazón preventivamente cuesta poco con seguro y mucho sin él."
      },
      {
        "name": "Angiograma coronario (cateterismo)",
        "aka": "Coronary angiogram (cardiac catheterization)",
        "costLow": 2000,
        "costHigh": 25000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 días de reposo; actividad ligera en pocos días",
        "extra": "Procedimiento invasivo hospitalario; incluye sala y personal.",
        "talkingPoint": "Sin seguro, un cateterismo puede costar como un auto; la cobertura es esencial."
      },
      {
        "name": "Fluoroscopía",
        "aka": "Fluoroscopy",
        "costLow": 200,
        "costHigh": 2000,
        "unit": "por estudio",
        "extra": "Imagen en tiempo real; costo según procedimiento guiado.",
        "talkingPoint": "Los estudios guiados por imagen son otro gasto que el seguro amortigua."
      },
      {
        "name": "Serie gastrointestinal con bario",
        "aka": "Barium swallow / GI series",
        "costLow": 200,
        "costHigh": 1500,
        "unit": "por estudio",
        "extra": "Estudio con contraste de bario para el tubo digestivo.",
        "talkingPoint": "Diagnosticar problemas digestivos a tiempo con cobertura evita facturas mayores."
      },
      {
        "name": "Histerosalpingografía",
        "aka": "Hysterosalpingogram (HSG)",
        "costLow": 500,
        "costHigh": 3000,
        "unit": "por procedimiento",
        "recovery": "Molestias leves el mismo día; actividad normal al día siguiente",
        "extra": "Radiografía con contraste de útero y trompas; estudio de fertilidad.",
        "talkingPoint": "Los estudios de fertilidad se acumulan rápido; el seguro los hace accesibles."
      }
    ]
  },
  {
    "id": "laboratorio",
    "title": "Laboratorio y patología",
    "items": [
      {
        "name": "Hemograma completo",
        "aka": "Complete Blood Count (CBC)",
        "costLow": 10,
        "costHigh": 50,
        "unit": "por estudio",
        "extra": "En laboratorios de acceso directo baja a $10-$35; en hospital puede superar $100.",
        "talkingPoint": "Un análisis de rutina cuesta poco; detectar anemia o infección a tiempo evita hospitalizaciones caras."
      },
      {
        "name": "Panel metabólico básico",
        "aka": "Basic Metabolic Panel (BMP)",
        "costLow": 10,
        "costHigh": 50,
        "unit": "por estudio",
        "extra": "Mide glucosa, electrolitos y función renal.",
        "talkingPoint": "Vigilar riñón y azúcar cada año es barato; la diálisis sin seguro cuesta miles al mes."
      },
      {
        "name": "Panel metabólico completo",
        "aka": "Comprehensive Metabolic Panel (CMP)",
        "costLow": 10,
        "costHigh": 80,
        "unit": "por estudio",
        "extra": "14 pruebas incluyendo hígado y riñón; hospital cobra mucho más.",
        "talkingPoint": "Un chequeo completo económico revela problemas antes de que sean tratamientos costosos."
      },
      {
        "name": "Perfil lipídico",
        "aka": "Lipid Panel (cholesterol)",
        "costLow": 15,
        "costHigh": 100,
        "unit": "por estudio",
        "extra": "Colesterol total, LDL, HDL y triglicéridos.",
        "talkingPoint": "Conocer tu colesterol previene infartos; un solo infarto sin seguro cuesta decenas de miles."
      },
      {
        "name": "Hemoglobina glicosilada",
        "aka": "HbA1c",
        "costLow": 15,
        "costHigh": 80,
        "unit": "por estudio",
        "extra": "Promedio de azúcar de 3 meses; clave en diabetes.",
        "talkingPoint": "Controlar la diabetes a tiempo evita amputaciones y hospitalizaciones que cuestan una fortuna."
      },
      {
        "name": "Hormona estimulante de tiroides",
        "aka": "TSH",
        "costLow": 20,
        "costHigh": 90,
        "unit": "por estudio",
        "extra": "Tamizaje inicial de tiroides.",
        "talkingPoint": "Un análisis sencillo detecta el hipotiroidismo antes de complicaciones costosas."
      },
      {
        "name": "Panel tiroideo completo",
        "aka": "Thyroid Panel (TSH, Free T3, Free T4)",
        "costLow": 50,
        "costHigh": 200,
        "unit": "por estudio",
        "extra": "Más completo que solo TSH.",
        "talkingPoint": "El diagnóstico temprano de tiroides es barato frente a años de tratamiento sin control."
      },
      {
        "name": "Antígeno prostático específico",
        "aka": "PSA",
        "costLow": 25,
        "costHigh": 120,
        "unit": "por estudio",
        "extra": "Tamizaje de cáncer de próstata en hombres.",
        "talkingPoint": "Detectar próstata a tiempo con una prueba barata evita cirugías oncológicas de seis cifras."
      },
      {
        "name": "Vitamina D (25-hidroxi)",
        "aka": "Vitamin D, 25-Hydroxy",
        "costLow": 30,
        "costHigh": 150,
        "unit": "por estudio",
        "extra": "Deficiencia muy común.",
        "talkingPoint": "Corregir la vitamina D previene fracturas óseas y caídas costosas en adultos mayores."
      },
      {
        "name": "Panel de infecciones de transmisión sexual",
        "aka": "STD/STI Panel",
        "costLow": 80,
        "costHigh": 350,
        "unit": "por estudio",
        "extra": "Suele incluir clamidia, gonorrea, sífilis, VIH y hepatitis.",
        "talkingPoint": "Un panel preventivo cuesta poco; tratar una ITS avanzada sin seguro sale muchísimo más."
      },
      {
        "name": "Uroanálisis",
        "aka": "Urinalysis",
        "costLow": 10,
        "costHigh": 60,
        "unit": "por estudio",
        "extra": "Detecta infección, sangre, proteína.",
        "talkingPoint": "Una prueba de orina barata detecta infecciones y problemas renales antes de que se agraven."
      },
      {
        "name": "Urocultivo",
        "aka": "Urine Culture",
        "costLow": 20,
        "costHigh": 120,
        "unit": "por estudio",
        "extra": "Identifica la bacteria y el antibiótico correcto.",
        "talkingPoint": "Tratar bien una infección urinaria evita que suba al riñón y termine en urgencias."
      },
      {
        "name": "Patología de biopsia",
        "aka": "Biopsy Pathology (Surgical Pathology)",
        "costLow": 100,
        "costHigh": 700,
        "unit": "por estudio",
        "extra": "Precio varía según tamaño e inmunohistoquímica.",
        "talkingPoint": "Un diagnóstico de patología temprano define un tratamiento más simple y barato del cáncer."
      },
      {
        "name": "Prueba genética BRCA1/BRCA2",
        "aka": "BRCA1/BRCA2 Genetic Test",
        "costLow": 250,
        "costHigh": 2500,
        "unit": "por estudio",
        "extra": "Precio de lista alto; a veces cubierto si hay antecedentes familiares.",
        "talkingPoint": "Saber tu riesgo genético permite prevenir cáncer de mama y ovario antes de que aparezca."
      },
      {
        "name": "Tamizaje genético de portador",
        "aka": "Carrier Screening (genetic)",
        "costLow": 150,
        "costHigh": 600,
        "unit": "por estudio",
        "extra": "Recomendado antes o durante el embarazo.",
        "talkingPoint": "Planear un embarazo informado evita costos enormes de enfermedades hereditarias no previstas."
      },
      {
        "name": "Test de alergias (panel IgE)",
        "aka": "Allergy IgE Panel",
        "costLow": 60,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "Panel básico barato; el completo con muchos alérgenos sube mucho.",
        "talkingPoint": "Identificar alergias previene reacciones graves y visitas de emergencia costosas."
      },
      {
        "name": "Prueba PCR de COVID-19",
        "aka": "COVID-19 PCR Test",
        "costLow": 75,
        "costHigh": 200,
        "unit": "por estudio",
        "extra": "La prueba rápida de antígeno es más barata.",
        "talkingPoint": "Un diagnóstico rápido evita contagios y complicaciones que pueden requerir hospitalización."
      },
      {
        "name": "Prueba de gripe",
        "aka": "Influenza Test",
        "costLow": 30,
        "costHigh": 150,
        "unit": "por estudio",
        "extra": "Prueba rápida en consultorio.",
        "talkingPoint": "Diagnosticar la gripe a tiempo permite tratarla antes de una neumonía costosa."
      },
      {
        "name": "Prueba de embarazo en sangre",
        "aka": "Beta-hCG Blood Test",
        "costLow": 10,
        "costHigh": 80,
        "unit": "por estudio",
        "extra": "La de orina en consultorio es aún más barata.",
        "talkingPoint": "El control prenatal temprano protege a madre y bebé y evita complicaciones caras del parto."
      },
      {
        "name": "Tamizaje de drogas en orina",
        "aka": "Urine Drug Screen",
        "costLow": 30,
        "costHigh": 200,
        "unit": "por estudio",
        "extra": "Panel ampliado con confirmación cuesta más.",
        "talkingPoint": "La prevención y el chequeo temprano ahorran los altos costos del tratamiento de adicciones."
      },
      {
        "name": "Papanicolau",
        "aka": "Pap Smear (cervical cytology)",
        "costLow": 25,
        "costHigh": 150,
        "unit": "por estudio",
        "extra": "No incluye la visita ginecológica; con VPH sube.",
        "talkingPoint": "Un Papanicolau barato detecta cáncer cervical temprano, cuando es casi 100% tratable."
      },
      {
        "name": "Sangre oculta en heces",
        "aka": "FIT (Fecal Immunochemical Test)",
        "costLow": 5,
        "costHigh": 50,
        "unit": "por estudio",
        "extra": "Alternativa económica al Cologuard.",
        "talkingPoint": "Un tamizaje de heces muy barato puede detectar cáncer de colon antes de síntomas."
      },
      {
        "name": "Prueba de ADN en heces",
        "aka": "Cologuard (stool DNA test)",
        "costLow": 500,
        "costHigh": 680,
        "unit": "por estudio",
        "extra": "Precio de lista ~$599-$681; a veces con descuento de $100 pagando por adelantado.",
        "talkingPoint": "Detectar cáncer de colon a tiempo evita cirugías y quimioterapias que cuestan cientos de miles."
      },
      {
        "name": "Panel hormonal femenino",
        "aka": "Female Hormone Panel",
        "costLow": 100,
        "costHigh": 400,
        "unit": "por estudio",
        "extra": "Incluye estradiol, FSH, LH, progesterona.",
        "talkingPoint": "Entender tus hormonas guía tratamientos de fertilidad o menopausia sin gastos innecesarios."
      },
      {
        "name": "Ferritina",
        "aka": "Ferritin",
        "costLow": 15,
        "costHigh": 80,
        "unit": "por estudio",
        "extra": "Mide reservas de hierro.",
        "talkingPoint": "Detectar falta de hierro a tiempo evita anemias graves y transfusiones costosas."
      },
      {
        "name": "Proteína C reactiva",
        "aka": "C-Reactive Protein (CRP / hs-CRP)",
        "costLow": 10,
        "costHigh": 100,
        "unit": "por estudio",
        "extra": "La versión de alta sensibilidad (hs-CRP) para riesgo cardíaco cuesta más.",
        "talkingPoint": "Este marcador de inflamación ayuda a prevenir enfermedades cardíacas costosas."
      },
      {
        "name": "Cortisol",
        "aka": "Cortisol (serum)",
        "costLow": 30,
        "costHigh": 120,
        "unit": "por estudio",
        "extra": "Evalúa función suprarrenal y estrés.",
        "talkingPoint": "Diagnosticar trastornos hormonales temprano evita tratamientos complejos y caros."
      },
      {
        "name": "Testosterona total",
        "aka": "Total Testosterone",
        "costLow": 30,
        "costHigh": 120,
        "unit": "por estudio",
        "extra": "La testosterona libre se pide aparte.",
        "talkingPoint": "Un análisis simple orienta problemas de energía y fertilidad antes de tratamientos costosos."
      },
      {
        "name": "Vitamina B12",
        "aka": "Vitamin B12",
        "costLow": 20,
        "costHigh": 90,
        "unit": "por estudio",
        "extra": "Deficiencia común en veganos y mayores.",
        "talkingPoint": "Corregir la B12 a tiempo evita daño neurológico irreversible y costoso."
      },
      {
        "name": "Ácido fólico",
        "aka": "Folate",
        "costLow": 20,
        "costHigh": 80,
        "unit": "por estudio",
        "extra": "Importante en el embarazo.",
        "talkingPoint": "Un nivel adecuado de folato previene defectos de nacimiento y sus altísimos costos médicos."
      },
      {
        "name": "Panel hepático",
        "aka": "Liver Function Tests (LFT)",
        "costLow": 10,
        "costHigh": 80,
        "unit": "por estudio",
        "extra": "Enzimas del hígado (ALT, AST, bilirrubina).",
        "talkingPoint": "Vigilar el hígado detecta daño temprano y evita un trasplante que cuesta cientos de miles."
      },
      {
        "name": "Panel de hierro",
        "aka": "Iron Panel (Iron, TIBC, Transferrin)",
        "costLow": 20,
        "costHigh": 100,
        "unit": "por estudio",
        "extra": "Más completo que solo ferritina.",
        "talkingPoint": "Diagnosticar bien la anemia evita tratamientos repetidos y transfusiones costosas."
      },
      {
        "name": "Glucosa en ayunas",
        "aka": "Fasting Glucose",
        "costLow": 5,
        "costHigh": 40,
        "unit": "por estudio",
        "extra": "Tamizaje inicial de diabetes.",
        "talkingPoint": "Una prueba muy barata detecta prediabetes, cuando aún se puede revertir sin costos altos."
      },
      {
        "name": "Cultivo de garganta",
        "aka": "Strep Throat Culture / Rapid Strep",
        "costLow": 20,
        "costHigh": 120,
        "unit": "por estudio",
        "extra": "La prueba rápida es más económica que el cultivo.",
        "talkingPoint": "Tratar el estreptococo a tiempo evita complicaciones cardíacas y renales muy costosas."
      },
      {
        "name": "Prueba de Helicobacter pylori",
        "aka": "H. pylori Test",
        "costLow": 20,
        "costHigh": 150,
        "unit": "por estudio",
        "extra": "Por aliento, sangre o heces.",
        "talkingPoint": "Tratar esta bacteria previene úlceras y cáncer gástrico que cuestan una fortuna."
      },
      {
        "name": "Prueba de VIH",
        "aka": "HIV Test",
        "costLow": 20,
        "costHigh": 150,
        "unit": "por estudio",
        "extra": "Prueba rápida o de laboratorio.",
        "talkingPoint": "El diagnóstico y tratamiento temprano del VIH reduce enormemente los costos de por vida."
      },
      {
        "name": "Panel de hepatitis",
        "aka": "Hepatitis Panel (A, B, C)",
        "costLow": 40,
        "costHigh": 250,
        "unit": "por estudio",
        "extra": "Detecta infección y estado de vacunación.",
        "talkingPoint": "Detectar hepatitis C a tiempo se cura con pastillas; sin control lleva a cirrosis costosísima."
      },
      {
        "name": "Ácido úrico",
        "aka": "Uric Acid",
        "costLow": 10,
        "costHigh": 50,
        "unit": "por estudio",
        "extra": "Relacionado con la gota.",
        "talkingPoint": "Controlar el ácido úrico previene crisis de gota y daño renal costoso."
      },
      {
        "name": "Prueba prenatal no invasiva",
        "aka": "NIPT (cell-free DNA prenatal)",
        "costLow": 200,
        "costHigh": 1500,
        "unit": "por estudio",
        "extra": "Precio de lista alto; a menudo negociable a self-pay más bajo.",
        "talkingPoint": "Un tamizaje prenatal informado ayuda a planear y evitar complicaciones costosas del embarazo."
      },
      {
        "name": "Marcadores tumorales",
        "aka": "Tumor Markers (CA-125, CEA, CA 19-9)",
        "costLow": 30,
        "costHigh": 250,
        "unit": "por estudio",
        "extra": "Se pueden pedir individuales o en panel.",
        "talkingPoint": "El seguimiento de marcadores tumorales permite actuar temprano contra el cáncer y ahorrar en tratamiento."
      }
    ]
  },
  {
    "id": "cirugias",
    "title": "Cirugías",
    "items": [
      {
        "name": "Apendicectomía",
        "aka": "Appendectomy (CPT 44970)",
        "costLow": 10000,
        "costHigh": 35000,
        "unit": "por procedimiento",
        "recovery": "2 a 4 semanas",
        "extra": "Laparoscópica; urgencia, no se puede posponer",
        "talkingPoint": "Una urgencia inevitable: sin seguro, una noche puede costar lo de un auto."
      },
      {
        "name": "Colecistectomía (extracción de vesícula)",
        "aka": "Cholecystectomy (CPT 47562)",
        "costLow": 10000,
        "costHigh": 30000,
        "unit": "por procedimiento",
        "recovery": "1 a 3 semanas",
        "extra": "Laparoscópica; incluye anestesia y hospital",
        "talkingPoint": "Los cálculos biliares llegan sin avisar; el seguro convierte $25.000 en un copago."
      },
      {
        "name": "Reparación de hernia inguinal",
        "aka": "Inguinal hernia repair (CPT 49505)",
        "costLow": 4000,
        "costHigh": 15000,
        "unit": "por procedimiento",
        "recovery": "1 a 3 semanas",
        "extra": "Con malla; ambulatorio suele ser más barato",
        "talkingPoint": "Postergarla por el precio agrava el riesgo; asegurado la resuelves a tiempo."
      },
      {
        "name": "Reemplazo total de rodilla",
        "aka": "Total knee replacement (CPT 27447)",
        "costLow": 30000,
        "costHigh": 70000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 meses",
        "extra": "+ fisioterapia; hospital vs centro ambulatorio",
        "talkingPoint": "La rehabilitación suma miles; el seguro cubre cirugía y terapia."
      },
      {
        "name": "Reemplazo total de cadera",
        "aka": "Total hip replacement (CPT 27130)",
        "costLow": 30000,
        "costHigh": 75000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 meses",
        "extra": "+ prótesis y fisioterapia",
        "talkingPoint": "Recuperar la movilidad no debería costar los ahorros de una vida."
      },
      {
        "name": "Reconstrucción de LCA",
        "aka": "ACL reconstruction (CPT 29888)",
        "costLow": 20000,
        "costHigh": 50000,
        "unit": "por procedimiento",
        "recovery": "6 a 9 meses",
        "extra": "Artroscópica; + rehabilitación prolongada",
        "talkingPoint": "Lesión común en deportistas jóvenes; asegúrate antes de la próxima cancha."
      },
      {
        "name": "Reparación de manguito rotador",
        "aka": "Rotator cuff repair (CPT 29827)",
        "costLow": 15000,
        "costHigh": 35000,
        "unit": "por procedimiento",
        "recovery": "4 a 6 meses",
        "extra": "Artroscópica; + terapia física",
        "talkingPoint": "El hombro se desgasta con la edad; un seguro te ahorra decenas de miles."
      },
      {
        "name": "Cirugía de cataratas",
        "aka": "Cataract surgery (CPT 66984)",
        "costLow": 3000,
        "costHigh": 7000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Precio por ojo; lente intraocular incluido",
        "talkingPoint": "Casi inevitable con la edad; prevenir la ceguera cuesta poco asegurado."
      },
      {
        "name": "Cirugía LASIK",
        "aka": "LASIK eye surgery",
        "costLow": 2000,
        "costHigh": 4000,
        "unit": "por procedimiento",
        "recovery": "1 a 3 días",
        "extra": "Ambos ojos; rara vez cubierta, es electiva",
        "talkingPoint": "Electiva y casi nunca cubierta: planifica el gasto con anticipación."
      },
      {
        "name": "Bypass gástrico (bariátrica)",
        "aka": "Gastric bypass (Roux-en-Y)",
        "costLow": 15000,
        "costHigh": 35000,
        "unit": "por procedimiento",
        "recovery": "3 a 5 semanas",
        "extra": "Algunos planes la cubren por indicación médica",
        "talkingPoint": "Tratar la obesidad hoy previene diabetes y cardiopatías carísimas mañana."
      },
      {
        "name": "Manga gástrica",
        "aka": "Gastric sleeve (sleeve gastrectomy)",
        "costLow": 10000,
        "costHigh": 26000,
        "unit": "por procedimiento",
        "recovery": "2 a 4 semanas",
        "extra": "Más económica que el bypass",
        "talkingPoint": "Invertir en salud metabólica evita costos crónicos de por vida."
      },
      {
        "name": "Histerectomía",
        "aka": "Hysterectomy (CPT 58150)",
        "costLow": 10000,
        "costHigh": 45000,
        "unit": "por procedimiento",
        "recovery": "4 a 6 semanas",
        "extra": "Vaginal/laparoscópica más barata que abdominal",
        "talkingPoint": "Procedimiento ginecológico frecuente; asegurada evitas una factura de cinco cifras."
      },
      {
        "name": "Amigdalectomía",
        "aka": "Tonsillectomy (CPT 42826)",
        "costLow": 4000,
        "costHigh": 12000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Común en niños; ambulatoria",
        "talkingPoint": "Un plan familiar cubre las cirugías típicas de la infancia."
      },
      {
        "name": "Bypass coronario (CABG)",
        "aka": "Coronary artery bypass graft",
        "costLow": 70000,
        "costHigh": 200000,
        "unit": "por procedimiento",
        "recovery": "6 a 12 semanas",
        "extra": "Incluye UCI; varía según número de puentes",
        "talkingPoint": "Una cardiopatía sin seguro puede significar la ruina; prevenir es vital."
      },
      {
        "name": "Angioplastia con stent",
        "aka": "Angioplasty / coronary stent (PCI)",
        "costLow": 28000,
        "costHigh": 100000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Según número y tipo de stents",
        "talkingPoint": "El seguro convierte una emergencia cardíaca en un copago manejable."
      },
      {
        "name": "Implante de marcapasos",
        "aka": "Pacemaker implantation (CPT 33208)",
        "costLow": 19000,
        "costHigh": 96000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Dispositivo + colocación",
        "talkingPoint": "Un corazón que falla no espera; asegúrate antes de necesitarlo."
      },
      {
        "name": "Fusión espinal",
        "aka": "Spinal fusion (CPT 22612)",
        "costLow": 60000,
        "costHigh": 150000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 meses",
        "extra": "Según niveles; una de las cirugías más caras",
        "talkingPoint": "El dolor de espalda crónico puede costar seis cifras sin cobertura."
      },
      {
        "name": "Laminectomía",
        "aka": "Laminectomy (CPT 63030)",
        "costLow": 20000,
        "costHigh": 90000,
        "unit": "por procedimiento",
        "recovery": "4 a 6 semanas",
        "extra": "Descompresión; menos invasiva que la fusión",
        "talkingPoint": "Aliviar la compresión nerviosa a tiempo evita daño permanente y gasto mayor."
      },
      {
        "name": "Mastectomía",
        "aka": "Mastectomy (CPT 19303)",
        "costLow": 15000,
        "costHigh": 55000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 semanas",
        "extra": "+ reconstrucción opcional aparte",
        "talkingPoint": "La detección temprana y el seguro salvan vidas y patrimonios."
      },
      {
        "name": "Prostatectomía",
        "aka": "Prostatectomy (CPT 55866)",
        "costLow": 10000,
        "costHigh": 40000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 semanas",
        "extra": "Robótica cuesta más; por cáncer de próstata",
        "talkingPoint": "Chequeos cubiertos detectan el cáncer antes de que salga carísimo."
      },
      {
        "name": "Tiroidectomía",
        "aka": "Thyroidectomy (CPT 60240)",
        "costLow": 7000,
        "costHigh": 30000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Total o parcial; + medicación de por vida",
        "talkingPoint": "Los nódulos tiroideos son frecuentes; el seguro cubre cirugía y seguimiento."
      },
      {
        "name": "Liberación del túnel carpiano",
        "aka": "Carpal tunnel release (CPT 64721)",
        "costLow": 4000,
        "costHigh": 12000,
        "unit": "por procedimiento",
        "recovery": "2 a 6 semanas",
        "extra": "Ambulatoria; endoscópica o abierta",
        "talkingPoint": "Lesión por esfuerzo repetitivo muy común en oficinas; cubierta cuesta poco."
      },
      {
        "name": "Hemorroidectomía",
        "aka": "Hemorrhoidectomy (CPT 46260)",
        "costLow": 3000,
        "costHigh": 12000,
        "unit": "por procedimiento",
        "recovery": "1 a 3 semanas",
        "extra": "Ambulatoria",
        "talkingPoint": "Un problema común que nadie quiere pagar de su bolsillo."
      },
      {
        "name": "Extracción de muelas del juicio",
        "aka": "Wisdom teeth extraction",
        "costLow": 1000,
        "costHigh": 4000,
        "unit": "por procedimiento",
        "recovery": "3 a 7 días",
        "extra": "Las cuatro; impactadas cuestan más",
        "talkingPoint": "Un plan dental cubre esta cirugía casi universal en jóvenes."
      },
      {
        "name": "Escisión de cáncer de piel (Mohs)",
        "aka": "Mohs surgery",
        "costLow": 1000,
        "costHigh": 4000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Según capas; + reconstrucción si es grande",
        "talkingPoint": "La detección temprana del melanoma es barata; tratarlo tarde, no."
      },
      {
        "name": "Vasectomía",
        "aka": "Vasectomy (CPT 55250)",
        "costLow": 500,
        "costHigh": 1500,
        "unit": "por procedimiento",
        "recovery": "2 a 5 días",
        "extra": "Ambulatoria; anticoncepción permanente",
        "talkingPoint": "Método económico y definitivo; muchos planes lo cubren al 100%."
      },
      {
        "name": "Ligadura de trompas",
        "aka": "Tubal ligation (CPT 58670)",
        "costLow": 3000,
        "costHigh": 10000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Laparoscópica",
        "talkingPoint": "Planificación familiar cubierta sin copago en muchos planes."
      },
      {
        "name": "Cesárea",
        "aka": "Cesarean section (C-section)",
        "costLow": 8000,
        "costHigh": 30000,
        "unit": "por procedimiento",
        "recovery": "4 a 6 semanas",
        "extra": "Más cara que el parto vaginal",
        "talkingPoint": "Un embarazo sin seguro puede costar más que un año de universidad."
      },
      {
        "name": "Septoplastia",
        "aka": "Septoplasty (CPT 30520)",
        "costLow": 5000,
        "costHigh": 15000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Corrige tabique desviado; funcional",
        "talkingPoint": "Si mejora la respiración, muchas veces el seguro la cubre."
      },
      {
        "name": "Artroscopia de rodilla",
        "aka": "Knee arthroscopy (CPT 29881)",
        "costLow": 6000,
        "costHigh": 15000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 semanas",
        "extra": "Menisco; ambulatoria",
        "talkingPoint": "Reparación mínimamente invasiva que sin seguro sigue siendo costosa."
      },
      {
        "name": "Reemplazo de hombro",
        "aka": "Shoulder replacement (CPT 23472)",
        "costLow": 25000,
        "costHigh": 60000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 meses",
        "extra": "+ fisioterapia extensa",
        "talkingPoint": "La artrosis de hombro se trata mejor asegurado y a tiempo."
      },
      {
        "name": "Amputación de miembro inferior",
        "aka": "Lower limb amputation",
        "costLow": 20000,
        "costHigh": 60000,
        "unit": "por procedimiento",
        "recovery": "2 a 6 meses",
        "extra": "+ prótesis y rehabilitación aparte",
        "talkingPoint": "Controlar diabetes con cobertura previene amputaciones devastadoras."
      },
      {
        "name": "Trasplante de riñón",
        "aka": "Kidney transplant",
        "costLow": 300000,
        "costHigh": 450000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 meses",
        "extra": "+ inmunosupresores de por vida",
        "talkingPoint": "Un trasplante sin seguro es impagable; la cobertura es literalmente vital."
      },
      {
        "name": "Craneotomía",
        "aka": "Craniotomy",
        "costLow": 50000,
        "costHigh": 150000,
        "unit": "por procedimiento",
        "recovery": "6 a 12 semanas",
        "extra": "Tumor/aneurisma cerebral; UCI incluida",
        "talkingPoint": "La neurocirugía está entre lo más caro que existe sin cobertura."
      },
      {
        "name": "Discectomía",
        "aka": "Discectomy / microdiscectomy (CPT 63030)",
        "costLow": 20000,
        "costHigh": 50000,
        "unit": "por procedimiento",
        "recovery": "2 a 6 semanas",
        "extra": "Hernia de disco; menos que la fusión",
        "talkingPoint": "Resolver una hernia discal a tiempo evita cirugías mayores luego."
      },
      {
        "name": "Reemplazo de válvula cardíaca",
        "aka": "Heart valve replacement (TAVR/SAVR)",
        "costLow": 100000,
        "costHigh": 250000,
        "unit": "por procedimiento",
        "recovery": "4 a 8 semanas",
        "extra": "TAVR percutáneo o quirúrgico abierto",
        "talkingPoint": "Una válvula defectuosa exige cirugía carísima; asegúrate del corazón."
      },
      {
        "name": "Colectomía (resección de colon)",
        "aka": "Colectomy (CPT 44140)",
        "costLow": 30000,
        "costHigh": 75000,
        "unit": "por procedimiento",
        "recovery": "4 a 6 semanas",
        "extra": "Por cáncer o diverticulitis",
        "talkingPoint": "La colonoscopia preventiva cubierta evita cirugías de colon costosas."
      },
      {
        "name": "Nefrectomía",
        "aka": "Nephrectomy (CPT 50545)",
        "costLow": 20000,
        "costHigh": 50000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 semanas",
        "extra": "Parcial o total; por tumor renal",
        "talkingPoint": "Detectar tumores renales temprano reduce el alcance y el costo."
      },
      {
        "name": "Cirugía de juanetes",
        "aka": "Bunionectomy (CPT 28296)",
        "costLow": 3500,
        "costHigh": 12000,
        "unit": "por procedimiento",
        "recovery": "6 a 12 semanas",
        "extra": "Ambulatoria; un pie",
        "talkingPoint": "Problema ortopédico frecuente que sin seguro sale sorprendentemente caro."
      },
      {
        "name": "Endarterectomía carotídea",
        "aka": "Carotid endarterectomy (CPT 35301)",
        "costLow": 15000,
        "costHigh": 45000,
        "unit": "por procedimiento",
        "recovery": "2 a 4 semanas",
        "extra": "Previene ACV por placa carotídea",
        "talkingPoint": "Prevenir un derrame cerebral con cobertura ahorra vidas y fortunas."
      },
      {
        "name": "Litotricia (cálculos renales)",
        "aka": "Lithotripsy (CPT 50590)",
        "costLow": 5000,
        "costHigh": 15000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Ondas de choque; ambulatoria",
        "talkingPoint": "Los cálculos renales recurren; el seguro cubre cada episodio doloroso."
      },
      {
        "name": "Resección transuretral de próstata (RTUP)",
        "aka": "TURP (CPT 52601)",
        "costLow": 10000,
        "costHigh": 25000,
        "unit": "por procedimiento",
        "recovery": "2 a 4 semanas",
        "extra": "Por próstata agrandada (HPB)",
        "talkingPoint": "Problema urológico común tras los 60; asegúrate antes de la edad de riesgo."
      },
      {
        "name": "Cirugía endoscópica de senos (FESS)",
        "aka": "Functional endoscopic sinus surgery",
        "costLow": 8000,
        "costHigh": 20000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Sinusitis crónica; ambulatoria",
        "talkingPoint": "La sinusitis crónica se opera cubierta cuando falla el tratamiento."
      },
      {
        "name": "Vitrectomía / reparación de retina",
        "aka": "Vitrectomy / retinal detachment repair",
        "costLow": 8000,
        "costHigh": 15000,
        "unit": "por procedimiento",
        "recovery": "2 a 4 semanas",
        "extra": "Desprendimiento de retina; urgente",
        "talkingPoint": "Salvar la vista es una urgencia; el seguro evita perderla por dinero."
      },
      {
        "name": "Lumpectomía",
        "aka": "Lumpectomy (CPT 19301)",
        "costLow": 10000,
        "costHigh": 25000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Conserva la mama; + radioterapia luego",
        "talkingPoint": "Mamografías cubiertas detectan el cáncer cuando aún es operable y barato."
      },
      {
        "name": "Miomectomía",
        "aka": "Myomectomy (CPT 58140)",
        "costLow": 10000,
        "costHigh": 25000,
        "unit": "por procedimiento",
        "recovery": "2 a 6 semanas",
        "extra": "Extrae miomas conservando el útero",
        "talkingPoint": "Alternativa a la histerectomía que el seguro suele cubrir."
      },
      {
        "name": "Funduplicatura de Nissen (reflujo)",
        "aka": "Nissen fundoplication (CPT 43280)",
        "costLow": 12000,
        "costHigh": 30000,
        "unit": "por procedimiento",
        "recovery": "2 a 4 semanas",
        "extra": "Para reflujo/hernia hiatal severos",
        "talkingPoint": "El reflujo crónico no tratado daña el esófago; opéralo cubierto."
      },
      {
        "name": "Cirugía de Whipple (pancreatectomía)",
        "aka": "Whipple procedure (CPT 48150)",
        "costLow": 50000,
        "costHigh": 150000,
        "unit": "por procedimiento",
        "recovery": "2 a 3 meses",
        "extra": "Cáncer de páncreas; muy compleja",
        "talkingPoint": "Una de las cirugías más complejas; impensable pagarla sin seguro."
      },
      {
        "name": "Implante coclear",
        "aka": "Cochlear implant",
        "costLow": 30000,
        "costHigh": 100000,
        "unit": "por procedimiento",
        "recovery": "4 a 6 semanas",
        "extra": "Dispositivo + cirugía + rehabilitación auditiva",
        "talkingPoint": "Recuperar la audición cuesta una fortuna; verifica que tu plan lo cubra."
      },
      {
        "name": "Blefaroplastia funcional",
        "aka": "Blepharoplasty (CPT 15823)",
        "costLow": 3000,
        "costHigh": 6000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Cubierta si obstruye la visión, no estética",
        "talkingPoint": "Si afecta la visión, deja de ser cosmética y el seguro la considera."
      },
      {
        "name": "Rinoplastia funcional",
        "aka": "Functional rhinoplasty (CPT 30400)",
        "costLow": 5000,
        "costHigh": 15000,
        "unit": "por procedimiento",
        "recovery": "1 a 3 semanas",
        "extra": "Cubierta si mejora respiración, no estética",
        "talkingPoint": "Por obstrucción nasal muchas veces entra en la cobertura médica."
      },
      {
        "name": "Cirugía de várices",
        "aka": "Varicose vein surgery / ablation",
        "costLow": 3000,
        "costHigh": 10000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Ablación por láser o radiofrecuencia",
        "talkingPoint": "Tratar la insuficiencia venosa cubierta evita úlceras costosas."
      },
      {
        "name": "Cifoplastia / vertebroplastia",
        "aka": "Kyphoplasty (CPT 22514)",
        "costLow": 15000,
        "costHigh": 40000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Fractura vertebral por osteoporosis",
        "talkingPoint": "La osteoporosis fractura huesos; el seguro cubre repararlos."
      },
      {
        "name": "Reemplazo de tobillo",
        "aka": "Total ankle replacement (CPT 27702)",
        "costLow": 20000,
        "costHigh": 50000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 meses",
        "extra": "Alternativa a la fusión de tobillo",
        "talkingPoint": "La artrosis avanzada de tobillo requiere prótesis costosa; asegúrate."
      },
      {
        "name": "Injerto de piel",
        "aka": "Skin graft (CPT 15100)",
        "costLow": 5000,
        "costHigh": 20000,
        "unit": "por procedimiento",
        "recovery": "2 a 6 semanas",
        "extra": "Por quemaduras o heridas grandes",
        "talkingPoint": "Las quemaduras graves exigen múltiples cirugías; la cobertura es clave."
      },
      {
        "name": "Abdominoplastia funcional (panículo)",
        "aka": "Panniculectomy (CPT 15830)",
        "costLow": 6000,
        "costHigh": 15000,
        "unit": "por procedimiento",
        "recovery": "3 a 6 semanas",
        "extra": "Cubierta si es médica tras baja de peso",
        "talkingPoint": "Tras cirugía bariátrica puede ser médicamente necesaria y cubierta."
      },
      {
        "name": "Adenoidectomía",
        "aka": "Adenoidectomy (CPT 42830)",
        "costLow": 3000,
        "costHigh": 8000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Común en niños; suele ir con amígdalas",
        "talkingPoint": "Cirugía pediátrica típica que un plan familiar cubre sin sustos."
      },
      {
        "name": "Colocación de tubos de oído",
        "aka": "Ear tube placement (myringotomy, CPT 69436)",
        "costLow": 2000,
        "costHigh": 5000,
        "unit": "por procedimiento",
        "recovery": "1 a 3 días",
        "extra": "Infecciones de oído recurrentes en niños",
        "talkingPoint": "Otitis repetida en niños; el seguro evita facturas por cada episodio."
      },
      {
        "name": "Reparación de hernia umbilical",
        "aka": "Umbilical hernia repair (CPT 49585)",
        "costLow": 4000,
        "costHigh": 12000,
        "unit": "por procedimiento",
        "recovery": "1 a 3 semanas",
        "extra": "Ambulatoria; con o sin malla",
        "talkingPoint": "Repararla temprano cubierto previene complicaciones de urgencia."
      },
      {
        "name": "Reparación de aneurisma aórtico (EVAR)",
        "aka": "Aortic aneurysm repair (EVAR)",
        "costLow": 40000,
        "costHigh": 120000,
        "unit": "por procedimiento",
        "recovery": "4 a 8 semanas",
        "extra": "Endovascular menos invasiva que abierta",
        "talkingPoint": "Un aneurisma detectado a tiempo se repara; roto, es mortal y ruinoso."
      }
    ]
  },
  {
    "id": "maternidad",
    "title": "Maternidad y embarazo",
    "items": [
      {
        "name": "Paquete de control prenatal completo",
        "aka": "Full prenatal care package (global OB fee)",
        "costLow": 2000,
        "costHigh": 4000,
        "unit": "tratamiento",
        "extra": "Suele incluir 10-14 visitas, pero laboratorios y ecografías se facturan aparte",
        "talkingPoint": "El control prenatal completo cuesta miles sin seguro; con cobertura preventiva detectas riesgos a tiempo y casi sin gasto."
      },
      {
        "name": "Consulta prenatal individual",
        "aka": "Single prenatal office visit",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por visita",
        "extra": "Cada visita se factura por separado si no hay paquete",
        "talkingPoint": "Una sola consulta ya cuesta hasta 250 dólares; el seguro convierte esas visitas en algo casi gratuito."
      },
      {
        "name": "Parto vaginal en hospital",
        "aka": "Vaginal delivery (hospital)",
        "costLow": 9000,
        "costHigh": 18000,
        "unit": "tratamiento",
        "recovery": "4 a 6 semanas",
        "extra": "No incluye epidural ni atención del recién nacido; sube con complicaciones",
        "talkingPoint": "Traer un bebé al mundo sin seguro puede costar hasta 18 mil dólares; asegurarse antes del embarazo lo cambia todo."
      },
      {
        "name": "Parto por cesárea",
        "aka": "Cesarean section (C-section)",
        "costLow": 12000,
        "costHigh": 30000,
        "unit": "tratamiento",
        "recovery": "6 a 8 semanas",
        "extra": "Cirugía mayor; incluye quirófano y estancia más larga que el parto vaginal",
        "talkingPoint": "Una cesárea sin seguro supera fácil los 26 mil dólares; con cobertura ese golpe financiero desaparece."
      },
      {
        "name": "Epidural para el parto",
        "aka": "Epidural anesthesia (labor)",
        "costLow": 1000,
        "costHigh": 8000,
        "unit": "por procedimiento",
        "extra": "Se factura aparte del parto; incluye honorarios del anestesiólogo",
        "talkingPoint": "El alivio del dolor en el parto puede costar miles aparte; el seguro te evita elegir entre bienestar y bolsillo."
      },
      {
        "name": "Ecografía obstétrica de rutina",
        "aka": "Obstetric ultrasound / sonogram",
        "costLow": 200,
        "costHigh": 1000,
        "unit": "por estudio",
        "extra": "Precio varía mucho entre consultorio y hospital",
        "talkingPoint": "Cada ecografía se paga sola sin seguro; con cobertura ves crecer a tu bebé sin preocuparte por la factura."
      },
      {
        "name": "Ecografía anatómica de nivel II",
        "aka": "Level II anatomy scan (detailed ultrasound)",
        "costLow": 300,
        "costHigh": 1200,
        "unit": "por estudio",
        "extra": "Estudio detallado del segundo trimestre; más caro que la ecografía básica",
        "talkingPoint": "El escaneo anatómico detecta problemas a tiempo; sin seguro cuesta más de mil dólares, con seguro es prevención cubierta."
      },
      {
        "name": "UCIN (cuidados intensivos neonatales) por día",
        "aka": "NICU stay (per day)",
        "costLow": 3000,
        "costHigh": 10000,
        "unit": "por día",
        "extra": "Nivel III-IV puede superar los 10 mil por día; una estancia completa promedia 70 mil",
        "talkingPoint": "Un solo día en UCIN cuesta lo de un auto; el seguro es la diferencia entre concentrarte en tu bebé o en la deuda."
      },
      {
        "name": "Ciclo de fertilización in vitro (FIV)",
        "aka": "IVF cycle",
        "costLow": 12000,
        "costHigh": 25000,
        "unit": "por ciclo",
        "extra": "Ciclo base 12-18 mil; con medicamentos y extras hasta 30 mil",
        "talkingPoint": "Un ciclo de FIV sin cobertura cuesta más de 20 mil dólares; los planes con beneficio de fertilidad ahorran una fortuna."
      },
      {
        "name": "Medicamentos de estimulación para FIV",
        "aka": "IVF fertility medications",
        "costLow": 3000,
        "costHigh": 7000,
        "unit": "por ciclo",
        "extra": "Gonadotropinas inyectables; se facturan aparte del ciclo de FIV",
        "talkingPoint": "Solo los medicamentos de FIV cuestan miles por ciclo; un seguro con farmacia de fertilidad reduce ese gasto enormemente."
      },
      {
        "name": "Inseminación intrauterina (IIU)",
        "aka": "Intrauterine insemination (IUI)",
        "costLow": 500,
        "costHigh": 4000,
        "unit": "por ciclo",
        "extra": "Costa Oeste y Noreste son más caros; con medicación sube de precio",
        "talkingPoint": "La IIU es la opción de fertilidad más accesible, pero aun así se paga por ciclo; el seguro estira cada intento."
      },
      {
        "name": "Legrado uterino (D&C)",
        "aka": "Dilation and curettage (D&C)",
        "costLow": 2000,
        "costHigh": 9000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Mucho más barato en clínicas tipo Planned Parenthood que en hospital",
        "talkingPoint": "Un legrado sin seguro llega a 9 mil dólares en un momento ya difícil; la cobertura te quita ese peso extra."
      },
      {
        "name": "Atención de aborto espontáneo",
        "aka": "Miscarriage management / care",
        "costLow": 1000,
        "costHigh": 7000,
        "unit": "tratamiento",
        "recovery": "1 a 3 semanas",
        "extra": "Incluye manejo médico o quirúrgico según el caso",
        "talkingPoint": "Perder un embarazo no debería venir con una factura de miles; el seguro cubre el cuidado en el peor momento."
      },
      {
        "name": "Visita de atención posparto",
        "aka": "Postpartum follow-up visit",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por visita",
        "extra": "Incluye evaluación física y tamizaje de salud mental posparto",
        "talkingPoint": "El control posparto detecta depresión y complicaciones; con seguro es rutina cubierta, no un gasto que se pospone."
      },
      {
        "name": "Paquete de centro de maternidad con partera",
        "aka": "Birth center / midwife package",
        "costLow": 6000,
        "costHigh": 9000,
        "unit": "tratamiento",
        "recovery": "4 a 6 semanas",
        "extra": "Precio agrupado: prenatal, parto y posparto; no incluye laboratorios",
        "talkingPoint": "El centro de maternidad cuesta la mitad que el hospital, y con seguro maternal el ahorro es aún mayor."
      },
      {
        "name": "Tamizaje prenatal no invasivo (NIPT)",
        "aka": "NIPT (cfDNA screening)",
        "costLow": 100,
        "costHigh": 800,
        "unit": "por estudio",
        "extra": "Precio en efectivo 99-299; la lista del hospital puede pasar de 2 mil",
        "talkingPoint": "El NIPT detecta riesgos cromosómicos con una prueba de sangre; el precio de lista asusta, el seguro lo hace accesible."
      },
      {
        "name": "Amniocentesis",
        "aka": "Amniocentesis",
        "costLow": 1000,
        "costHigh": 7000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 días",
        "extra": "Prueba diagnóstica invasiva del segundo trimestre",
        "talkingPoint": "Una amniocentesis diagnóstica puede costar 7 mil dólares sin seguro; la cobertura hace que decidir con información no cueste una fortuna."
      },
      {
        "name": "Prueba de tolerancia a la glucosa",
        "aka": "Glucose tolerance test (gestational diabetes)",
        "costLow": 50,
        "costHigh": 200,
        "unit": "por estudio",
        "extra": "Tamizaje rutinario de diabetes gestacional entre las semanas 24 y 28",
        "talkingPoint": "Detectar diabetes gestacional a tiempo evita partos complicados; es una prueba barata que el seguro cubre como prevención."
      },
      {
        "name": "Circuncisión del recién nacido",
        "aka": "Newborn circumcision",
        "costLow": 250,
        "costHigh": 800,
        "unit": "por procedimiento",
        "recovery": "7 a 10 días",
        "extra": "A menudo no cubierta; se factura aparte del parto",
        "talkingPoint": "La circuncisión suele facturarse aparte y no siempre está cubierta; conviene confirmar qué incluye tu plan antes del parto."
      },
      {
        "name": "Muestreo de vellosidades coriónicas (CVS)",
        "aka": "Chorionic villus sampling (CVS)",
        "costLow": 1000,
        "costHigh": 5000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 días",
        "extra": "Diagnóstico genético temprano, alternativa a la amniocentesis",
        "talkingPoint": "El CVS da respuestas genéticas antes que la amniocentesis, pero sin seguro cuesta miles; la cobertura lo vuelve una opción real."
      },
      {
        "name": "Estancia hospitalaria del recién nacido sano",
        "aka": "Healthy newborn nursery (per day)",
        "costLow": 1000,
        "costHigh": 3000,
        "unit": "por día",
        "extra": "Cuidado rutinario del bebé; se factura separado del parto de la madre",
        "talkingPoint": "Hasta un bebé sano genera su propia factura diaria; el seguro cubre a mamá y bebé como dos pacientes distintos."
      },
      {
        "name": "Tamizaje del primer trimestre (cuádruple marcador)",
        "aka": "First-trimester / quad marker screening",
        "costLow": 100,
        "costHigh": 400,
        "unit": "por estudio",
        "extra": "Combina análisis de sangre con ecografía de translucencia nucal",
        "talkingPoint": "El tamizaje temprano evalúa riesgos por poco dinero; con seguro es parte del cuidado prenatal preventivo."
      },
      {
        "name": "Tamizaje genético de portadores",
        "aka": "Genetic carrier screening panel",
        "costLow": 200,
        "costHigh": 600,
        "unit": "por estudio",
        "extra": "Análisis de sangre de los padres para enfermedades hereditarias",
        "talkingPoint": "Saber si eres portador antes o durante el embarazo previene sorpresas; el seguro convierte este panel en prevención cubierta."
      },
      {
        "name": "Congelación de óvulos",
        "aka": "Egg freezing (oocyte cryopreservation)",
        "costLow": 8000,
        "costHigh": 15000,
        "unit": "por ciclo",
        "extra": "No incluye almacenamiento anual ni medicamentos completos",
        "talkingPoint": "Preservar la fertilidad cuesta miles por ciclo; los beneficios de fertilidad en el seguro hacen posible planear el futuro."
      },
      {
        "name": "Transferencia de embriones congelados (FET)",
        "aka": "Frozen embryo transfer (FET)",
        "costLow": 3000,
        "costHigh": 6000,
        "unit": "por procedimiento",
        "extra": "Se paga aparte del ciclo de FIV inicial",
        "talkingPoint": "Cada transferencia de embrión es un gasto adicional; el seguro de fertilidad estira las oportunidades de éxito."
      },
      {
        "name": "Prueba sin estrés / monitoreo fetal",
        "aka": "Non-stress test (NST) / fetal monitoring",
        "costLow": 100,
        "costHigh": 400,
        "unit": "por estudio",
        "extra": "Común en embarazos de alto riesgo o después de la fecha probable",
        "talkingPoint": "Vigilar el bienestar del bebé al final del embarazo es clave; con seguro estos controles no se posponen por dinero."
      },
      {
        "name": "Acompañamiento de doula",
        "aka": "Doula support services",
        "costLow": 800,
        "costHigh": 2500,
        "unit": "tratamiento",
        "extra": "Apoyo continuo en parto y posparto; algunos planes ya lo reembolsan",
        "talkingPoint": "Cada vez más seguros reembolsan a la doula; vale la pena preguntar si tu plan cubre este acompañamiento."
      }
    ]
  },
  {
    "id": "salud-mental",
    "title": "Salud mental y adicciones",
    "items": [
      {
        "name": "Sesión de terapia individual con psicólogo",
        "aka": "Individual therapy / counseling session (CPT 90837)",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por sesión",
        "extra": "Sin seguro; centros comunitarios y escala móvil desde $30-60 por sesión.",
        "talkingPoint": "Con seguro pagas un copago fijo; sin seguro cada sesión semanal se acumula rápido."
      },
      {
        "name": "Terapia en línea / telesalud",
        "aka": "Online therapy / teletherapy (BetterHelp, Talkspace)",
        "costLow": 40,
        "costHigh": 150,
        "unit": "por sesión",
        "extra": "Suscripciones mensuales rondan $260-400; más barata que la terapia presencial.",
        "talkingPoint": "El seguro suele cubrir teleterapia, atenderte a tiempo previene una crisis costosa."
      },
      {
        "name": "Evaluación psiquiátrica inicial",
        "aka": "Initial psychiatric evaluation (CPT 90792)",
        "costLow": 250,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Cita de 60-90 min; incluye diagnóstico y plan de medicación.",
        "talkingPoint": "Una evaluación temprana cubierta por tu seguro evita años de tratamiento sin rumbo."
      },
      {
        "name": "Seguimiento con psiquiatra (manejo de medicación)",
        "aka": "Psychiatric follow-up / medication management (CPT 99213+90833)",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por visita",
        "extra": "Suele repetirse cada 1-3 meses mientras ajustan la medicación.",
        "talkingPoint": "El seguro reduce estas visitas recurrentes a un copago; sin él, cada ajuste cuesta."
      },
      {
        "name": "Hospitalización psiquiátrica internado",
        "aka": "Inpatient psychiatric hospitalization",
        "costLow": 800,
        "costHigh": 2500,
        "unit": "por día",
        "recovery": "Estancia típica de 3 a 10 días",
        "extra": "Una estancia de 30 días sin seguro puede superar los $30,000-$60,000.",
        "talkingPoint": "Una sola hospitalización sin cobertura puede costar más que años de primas de seguro."
      },
      {
        "name": "Programa de hospitalización parcial (PHP)",
        "aka": "Partial Hospitalization Program (PHP)",
        "costLow": 350,
        "costHigh": 900,
        "unit": "por día",
        "recovery": "Programa de 2 a 4 semanas, 5-6 horas al día",
        "extra": "Alternativa al internado; regresas a casa por la noche.",
        "talkingPoint": "Con seguro este nivel intensivo es accesible y evita una hospitalización completa."
      },
      {
        "name": "Programa intensivo ambulatorio (IOP)",
        "aka": "Intensive Outpatient Program (IOP)",
        "costLow": 250,
        "costHigh": 500,
        "unit": "por día",
        "recovery": "Programa de 6 a 12 semanas, 3 horas por sesión",
        "extra": "Curso completo sin seguro suele sumar $3,000-$10,000.",
        "talkingPoint": "El seguro convierte semanas de terapia intensiva en un copago manejable."
      },
      {
        "name": "Rehabilitación de adicciones internado (30 días)",
        "aka": "30-day inpatient drug/alcohol rehab",
        "costLow": 6000,
        "costHigh": 30000,
        "unit": "por tratamiento",
        "recovery": "Programa de 30 días; recuperación continua por meses",
        "extra": "Instalaciones estándar $14,000-$27,000; incluye alojamiento y terapia.",
        "talkingPoint": "Un seguro con beneficio de adicciones puede cubrir la mayor parte de este costo enorme."
      },
      {
        "name": "Rehabilitación de adicciones ambulatoria",
        "aka": "Outpatient addiction treatment program",
        "costLow": 1400,
        "costHigh": 10000,
        "unit": "por tratamiento",
        "recovery": "Programa de varias semanas a meses",
        "extra": "Más económica que el internado; permite seguir trabajando.",
        "talkingPoint": "Prevenir la recaída con tratamiento cubierto sale mucho más barato que reingresar."
      },
      {
        "name": "Rehabilitación de lujo / ejecutiva (30 días)",
        "aka": "Luxury / executive residential rehab",
        "costLow": 30000,
        "costHigh": 80000,
        "unit": "por tratamiento",
        "recovery": "Programa de 30 días con amenidades privadas",
        "extra": "Habitación privada, spa y proporción alta de personal.",
        "talkingPoint": "Aun sin lujos, un buen seguro te da acceso a rehabilitación de calidad sin arruinarte."
      },
      {
        "name": "Desintoxicación médica (detox)",
        "aka": "Medical detox",
        "costLow": 500,
        "costHigh": 1500,
        "unit": "por día",
        "recovery": "3 a 7 días con supervisión médica",
        "extra": "Total suele ser $3,000-$10,000; detox básico desde $250/día.",
        "talkingPoint": "El detox supervisado cubierto por seguro previene complicaciones que llevan a la UCI."
      },
      {
        "name": "Terapia electroconvulsiva (ECT)",
        "aka": "Electroconvulsive therapy (ECT)",
        "costLow": 1000,
        "costHigh": 2500,
        "unit": "por sesión",
        "recovery": "Confusión y pérdida de memoria temporal; horas tras cada sesión",
        "extra": "Un curso de 10-12 sesiones suma $15,000-$25,000; requiere sedación.",
        "talkingPoint": "Para depresión resistente, el seguro hace viable un tratamiento que salva vidas."
      },
      {
        "name": "Estimulación magnética transcraneal (TMS)",
        "aka": "Transcranial Magnetic Stimulation (TMS), 36 sesiones",
        "costLow": 6000,
        "costHigh": 15000,
        "unit": "por tratamiento",
        "recovery": "Sin tiempo de recuperación; retomas actividades de inmediato",
        "extra": "Curso de 30-36 sesiones, ~$300-500 por sesión; sin sedación.",
        "talkingPoint": "El seguro suele cubrir TMS tras fallar medicamentos, ahorrándote miles de dólares."
      },
      {
        "name": "Terapia con ketamina / esketamina (Spravato)",
        "aka": "Ketamine infusion / esketamine (Spravato) for depression",
        "costLow": 400,
        "costHigh": 1000,
        "unit": "por sesión",
        "recovery": "Observación de 2 horas tras cada dosis; no manejar ese día",
        "extra": "Serie inicial de 6-8 sesiones; Spravato tiene código cubierto por algunos seguros.",
        "talkingPoint": "Con cobertura, esta opción para depresión resistente deja de ser solo para quien puede pagarla."
      },
      {
        "name": "Evaluación neuropsicológica completa",
        "aka": "Neuropsychological evaluation",
        "costLow": 2000,
        "costHigh": 7000,
        "unit": "por estudio",
        "extra": "Incluye 15-25 horas de pruebas, informe y consulta.",
        "talkingPoint": "Un diagnóstico preciso cubierto por seguro evita años de tratamientos equivocados."
      },
      {
        "name": "Evaluación diagnóstica de autismo",
        "aka": "Autism (ASD) diagnostic evaluation",
        "costLow": 1200,
        "costHigh": 5000,
        "unit": "por evaluación",
        "extra": "Clínicas universitarias ofrecen tarifas reducidas por lista de espera.",
        "talkingPoint": "El seguro suele cubrir la evaluación, clave para acceder a terapias tempranas."
      },
      {
        "name": "Evaluación de TDAH",
        "aka": "ADHD assessment / testing",
        "costLow": 500,
        "costHigh": 2500,
        "unit": "por evaluación",
        "extra": "Más económica que una batería neuropsicológica completa.",
        "talkingPoint": "Diagnosticarlo con seguro abre la puerta a medicación y apoyos escolares cubiertos."
      },
      {
        "name": "Evaluación psicológica / pruebas psicológicas",
        "aka": "Psychological testing / evaluation",
        "costLow": 800,
        "costHigh": 3000,
        "unit": "por estudio",
        "extra": "Para diagnóstico diferencial, personalidad o discapacidad de aprendizaje.",
        "talkingPoint": "Con seguro, estas pruebas costosas se vuelven un copago accesible."
      },
      {
        "name": "Terapia de grupo",
        "aka": "Group therapy session",
        "costLow": 40,
        "costHigh": 80,
        "unit": "por sesión",
        "extra": "Opción más económica; frecuente en programas IOP/PHP.",
        "talkingPoint": "Aun siendo barata, tu seguro la cubre y suma al plan de recuperación completo."
      },
      {
        "name": "Terapia de pareja o familiar",
        "aka": "Couples / family therapy (CPT 90847)",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por sesión",
        "extra": "Algunos seguros solo la cubren si hay diagnóstico de un miembro.",
        "talkingPoint": "Verificar tu cobertura de terapia familiar te ahorra pagar cada sesión de tu bolsillo."
      },
      {
        "name": "Sala de emergencias psiquiátrica / evaluación de crisis",
        "aka": "Psychiatric ER visit / crisis evaluation",
        "costLow": 1000,
        "costHigh": 5000,
        "unit": "por visita",
        "extra": "La línea 988 de crisis es gratuita; el ER hospitalario no lo es.",
        "talkingPoint": "Una crisis sin seguro se paga en la sala de emergencias; la prevención cubierta cuesta mucho menos."
      },
      {
        "name": "Casa de recuperación / vivienda sobria (sober living)",
        "aka": "Sober living home",
        "costLow": 500,
        "costHigh": 2500,
        "unit": "por mes",
        "recovery": "Estancia de 3 a 12 meses tras rehabilitación",
        "extra": "Rara vez cubierta por seguro; apoya la transición post-rehab.",
        "talkingPoint": "Si el seguro cubre la rehabilitación, te queda presupuesto para este apoyo posterior."
      },
      {
        "name": "Tratamiento asistido con medicación (MAT)",
        "aka": "Medication-Assisted Treatment (methadone / Suboxone)",
        "costLow": 100,
        "costHigh": 500,
        "unit": "por mes",
        "recovery": "Tratamiento continuo de mantenimiento",
        "extra": "Metadona en clínica ~$400-600/mes; buprenorfina genérica es más barata.",
        "talkingPoint": "El seguro cubre el MAT que sostiene la recuperación y previene sobredosis costosas."
      },
      {
        "name": "Medicación antidepresiva (genérica)",
        "aka": "Generic antidepressant (sertraline, fluoxetine, escitalopram)",
        "costLow": 4,
        "costHigh": 30,
        "unit": "por envase",
        "extra": "Genérico con GoodRx ~$4-15; de marca puede costar $200-400.",
        "talkingPoint": "Con cobertura de farmacia y genéricos, tu tratamiento diario cuesta casi nada al mes."
      }
    ]
  },
  {
    "id": "dental",
    "title": "Dental",
    "items": [
      {
        "name": "Limpieza dental (profilaxis)",
        "aka": "Dental cleaning / prophylaxis (D1110)",
        "costLow": 75,
        "costHigh": 350,
        "unit": "por visita",
        "extra": "Se recomienda cada 6 meses",
        "talkingPoint": "Dos limpiezas al año cuestan menos que un solo empaste; con seguro suelen ir sin copago."
      },
      {
        "name": "Examen dental",
        "aka": "Dental exam / checkup (D0120)",
        "costLow": 50,
        "costHigh": 200,
        "unit": "por visita",
        "extra": "Suele incluirse con la limpieza",
        "talkingPoint": "Detectar una caries a tiempo evita una endodoncia de miles de dólares."
      },
      {
        "name": "Radiografías dentales",
        "aka": "Dental X-rays (bitewing / panoramic)",
        "costLow": 25,
        "costHigh": 250,
        "unit": "por estudio",
        "extra": "La panorámica cuesta más que la de aleta de mordida",
        "talkingPoint": "Una radiografía barata revela problemas ocultos antes de que sean costosos."
      },
      {
        "name": "Empaste de resina",
        "aka": "Composite filling (D2391)",
        "costLow": 150,
        "costHigh": 450,
        "unit": "por procedimiento",
        "extra": "La amalgama metálica suele ser más barata",
        "talkingPoint": "Tratar la caries pequeña hoy evita corona o extracción mañana."
      },
      {
        "name": "Corona dental",
        "aka": "Dental crown (D2740)",
        "costLow": 800,
        "costHigh": 2500,
        "unit": "por procedimiento",
        "recovery": "Adaptación de 1 a 2 semanas",
        "extra": "Porcelana/circonio más caras que metal",
        "talkingPoint": "El seguro suele cubrir 50%, convirtiendo $2000 en un gasto manejable."
      },
      {
        "name": "Endodoncia (tratamiento de conducto)",
        "aka": "Root canal (D3310-D3330)",
        "costLow": 700,
        "costHigh": 1800,
        "unit": "por procedimiento",
        "recovery": "Molestias de 2 a 3 días",
        "extra": "El molar es más caro que el incisivo; suele requerir corona después",
        "talkingPoint": "Salvar el diente con endodoncia es más barato que un implante de $5000."
      },
      {
        "name": "Extracción simple",
        "aka": "Simple tooth extraction (D7140)",
        "costLow": 100,
        "costHigh": 350,
        "unit": "por procedimiento",
        "recovery": "3 a 7 días",
        "extra": "Precio por diente visible y accesible",
        "talkingPoint": "Prevenir con limpiezas evita perder dientes y pagar reemplazos costosos."
      },
      {
        "name": "Extracción quirúrgica",
        "aka": "Surgical extraction (D7210)",
        "costLow": 250,
        "costHigh": 800,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Puede sumar anestesia o sedación",
        "talkingPoint": "Con seguro el copago baja mucho; sin él pagas todo de tu bolsillo."
      },
      {
        "name": "Implante dental",
        "aka": "Single dental implant (D6010)",
        "costLow": 3000,
        "costHigh": 6000,
        "unit": "por procedimiento",
        "recovery": "Osteointegración de 3 a 6 meses",
        "extra": "Incluye poste, pilar y corona",
        "talkingPoint": "Un implante iguala varios años de primas; asegurarte reparte ese costo."
      },
      {
        "name": "Puente dental",
        "aka": "Dental bridge (D6240)",
        "costLow": 1500,
        "costHigh": 5000,
        "unit": "por procedimiento",
        "extra": "Precio típico de puente de 3 unidades",
        "talkingPoint": "Reemplazar dientes cuesta miles; el seguro comparte parte de la factura."
      },
      {
        "name": "Dentadura completa",
        "aka": "Full denture (D5110)",
        "costLow": 1000,
        "costHigh": 4000,
        "unit": "por procedimiento",
        "recovery": "Adaptación de varias semanas",
        "extra": "Precio por arcada (superior o inferior)",
        "talkingPoint": "Cuidar tus dientes ahora evita el gasto total de una dentadura después."
      },
      {
        "name": "Dentadura parcial",
        "aka": "Partial denture (D5213)",
        "costLow": 500,
        "costHigh": 2500,
        "unit": "por procedimiento",
        "recovery": "Adaptación de 1 a 2 semanas",
        "extra": "El 'flipper' de acrílico es la opción más económica",
        "talkingPoint": "Prevenir la pérdida dental sale más barato que reponer piezas faltantes."
      },
      {
        "name": "Ortodoncia con brackets metálicos",
        "aka": "Metal braces",
        "costLow": 3000,
        "costHigh": 7500,
        "unit": "tratamiento",
        "extra": "Tratamiento típico de 18 a 24 meses",
        "talkingPoint": "Muchos planes ofrecen beneficio de ortodoncia que recorta miles de dólares."
      },
      {
        "name": "Invisalign",
        "aka": "Invisalign clear aligners",
        "costLow": 3000,
        "costHigh": 8000,
        "unit": "tratamiento",
        "extra": "Casos leves (express) desde ~$1800",
        "talkingPoint": "Con cobertura de ortodoncia y HSA/FSA el costo real baja bastante."
      },
      {
        "name": "Blanqueamiento en consultorio",
        "aka": "In-office teeth whitening",
        "costLow": 400,
        "costHigh": 1000,
        "unit": "por sesión",
        "extra": "Más rápido y duradero que el kit casero",
        "talkingPoint": "Estético, casi nunca lo cubre el seguro; conviene comparar precios."
      },
      {
        "name": "Limpieza profunda (raspado y alisado radicular)",
        "aka": "Scaling and root planing (D4341)",
        "costLow": 150,
        "costHigh": 350,
        "unit": "por procedimiento",
        "recovery": "Sensibilidad de pocos días",
        "extra": "Precio por cuadrante; boca completa $600-$1400",
        "talkingPoint": "Tratar la enfermedad de encías temprano evita cirugía periodontal cara."
      },
      {
        "name": "Guarda nocturna",
        "aka": "Night guard / occlusal guard",
        "costLow": 300,
        "costHigh": 800,
        "unit": "por procedimiento",
        "extra": "La de laboratorio dura más que la de farmacia",
        "talkingPoint": "Una guarda protege coronas y dientes de miles en reparaciones por bruxismo."
      },
      {
        "name": "Carillas de porcelana",
        "aka": "Porcelain veneers",
        "costLow": 900,
        "costHigh": 2500,
        "unit": "por procedimiento",
        "extra": "Precio por diente; la carilla de resina es más barata",
        "talkingPoint": "Es cosmético y rara vez cubierto; presupuéstalo con anticipación."
      },
      {
        "name": "Selladores dentales",
        "aka": "Dental sealants (D1351)",
        "costLow": 30,
        "costHigh": 90,
        "unit": "por procedimiento",
        "extra": "Precio por diente; ideal en molares de niños",
        "talkingPoint": "Unos dólares en selladores previenen caries que costarían cientos."
      },
      {
        "name": "Extracción de muelas del juicio",
        "aka": "Wisdom tooth extraction (D7220-D7240)",
        "costLow": 200,
        "costHigh": 1100,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "La impactada es más cara; 4 muelas $1000-$3000",
        "talkingPoint": "Sacarlas a tiempo evita infecciones y urgencias mucho más costosas."
      },
      {
        "name": "Cirugía de encías (periodontal)",
        "aka": "Periodontal osseous surgery (D4260)",
        "costLow": 1000,
        "costHigh": 3000,
        "unit": "por procedimiento",
        "recovery": "2 a 4 semanas",
        "extra": "Precio por cuadrante; boca completa hasta ~$8000",
        "talkingPoint": "Las limpiezas regulares con seguro previenen esta cirugía tan cara."
      },
      {
        "name": "Reparación de dentadura",
        "aka": "Denture repair",
        "costLow": 100,
        "costHigh": 500,
        "unit": "por procedimiento",
        "extra": "El rebase o ajuste es más económico que rehacerla",
        "talkingPoint": "Reparar sale barato; reemplazar toda la dentadura no tanto."
      },
      {
        "name": "Incrustación (inlay/onlay)",
        "aka": "Inlay / onlay (D2642)",
        "costLow": 650,
        "costHigh": 1200,
        "unit": "por procedimiento",
        "extra": "Alternativa conservadora a la corona",
        "talkingPoint": "Reparar el diente parcialmente evita llegar a corona o endodoncia."
      },
      {
        "name": "Brackets cerámicos",
        "aka": "Ceramic braces",
        "costLow": 4000,
        "costHigh": 8500,
        "unit": "tratamiento",
        "extra": "Menos visibles pero más caros que los metálicos",
        "talkingPoint": "El beneficio de ortodoncia del seguro reduce miles del costo total."
      },
      {
        "name": "Consulta dental de urgencia",
        "aka": "Emergency dental exam (D0140)",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "No incluye el tratamiento del problema",
        "talkingPoint": "Las urgencias llegan sin avisar; el seguro amortigua el golpe económico."
      },
      {
        "name": "Injerto óseo dental",
        "aka": "Bone graft (D7953)",
        "costLow": 300,
        "costHigh": 3000,
        "unit": "por procedimiento",
        "recovery": "Cicatrización de varias semanas",
        "extra": "Suele hacerse antes de colocar un implante",
        "talkingPoint": "Conservar el hueso con cuidado dental evita injertos costosos después."
      },
      {
        "name": "Blanqueamiento en casa con férulas",
        "aka": "Take-home whitening trays",
        "costLow": 100,
        "costHigh": 400,
        "unit": "tratamiento",
        "extra": "Más económico que el blanqueamiento en consultorio",
        "talkingPoint": "Opción estética accesible; casi nunca la cubre el seguro."
      },
      {
        "name": "Poste y reconstrucción de muñón",
        "aka": "Post and core buildup (D2954)",
        "costLow": 250,
        "costHigh": 600,
        "unit": "por procedimiento",
        "extra": "Necesario antes de la corona tras una endodoncia",
        "talkingPoint": "Parte del rescate del diente; el seguro comparte estos costos escalonados."
      },
      {
        "name": "Aplicación de flúor",
        "aka": "Fluoride treatment (D1208)",
        "costLow": 20,
        "costHigh": 60,
        "unit": "por visita",
        "extra": "Común en niños; refuerza el esmalte",
        "talkingPoint": "Prevención de bajo costo que evita caries y empastes futuros."
      },
      {
        "name": "Prótesis fija sobre implantes (All-on-4)",
        "aka": "All-on-4 full-arch implants",
        "costLow": 15000,
        "costHigh": 30000,
        "unit": "por procedimiento",
        "recovery": "Osteointegración de 3 a 6 meses",
        "extra": "Precio por arcada completa",
        "talkingPoint": "El tratamiento dental más caro; la prevención evita llegar a este punto."
      },
      {
        "name": "Corona sobre implante",
        "aka": "Implant-supported crown (D6058)",
        "costLow": 1000,
        "costHigh": 3000,
        "unit": "por procedimiento",
        "extra": "Se suma al costo del implante y el pilar",
        "talkingPoint": "Cada etapa del implante suma; el seguro ayuda a repartir el gasto."
      },
      {
        "name": "Apicectomía (cirugía de raíz)",
        "aka": "Apicoectomy (D3410)",
        "costLow": 900,
        "costHigh": 2500,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas",
        "extra": "Último recurso para salvar un diente con endodoncia fallida",
        "talkingPoint": "Salvar el diente cuesta menos que extraerlo e implantar uno nuevo."
      }
    ]
  },
  {
    "id": "vision",
    "title": "Visión y oftalmología",
    "items": [
      {
        "name": "Examen de la vista completo",
        "aka": "Comprehensive eye exam / routine vision exam",
        "costLow": 75,
        "costHigh": 250,
        "unit": "por visita",
        "extra": "Cadenas como Costco, Walmart o America's Best cobran $50-$100; consultorios independientes hasta $200-$300 en grandes ciudades.",
        "talkingPoint": "Un examen anual detecta problemas a tiempo y con seguro suele costarte $0."
      },
      {
        "name": "Anteojos con receta (armazón + lentes)",
        "aka": "Prescription eyeglasses (frame + lenses)",
        "costLow": 100,
        "costHigh": 600,
        "unit": "por tratamiento",
        "extra": "Lentes progresivos, antirreflejo o alto índice suben el precio; opciones básicas desde $100.",
        "talkingPoint": "El seguro de visión cubre un par al año y ahorras cientos en cada renovación."
      },
      {
        "name": "Lentes de contacto (suministro anual)",
        "aka": "Contact lenses (annual supply)",
        "costLow": 200,
        "costHigh": 1000,
        "unit": "por año",
        "extra": "Diarias desechables cuestan más que las mensuales; incluye examen de adaptación aparte.",
        "talkingPoint": "Con seguro obtienes un descuento anual en lentes que se paga solo."
      },
      {
        "name": "Cirugía LASIK",
        "aka": "LASIK refractive surgery",
        "costLow": 1500,
        "costHigh": 3500,
        "unit": "por procedimiento",
        "recovery": "24 a 48 horas para actividades normales; visión estable en 1 a 3 meses",
        "extra": "Precio por ojo; promedio nacional cercano a $2,250-$2,400 por ojo. Rara vez cubierto por seguro.",
        "talkingPoint": "Muchos planes ofrecen descuentos LASIK que reducen miles de dólares del precio."
      },
      {
        "name": "Cirugía PRK",
        "aka": "PRK (photorefractive keratectomy)",
        "costLow": 1500,
        "costHigh": 3000,
        "unit": "por procedimiento",
        "recovery": "3 a 5 días de molestias; visión estable en 1 a 3 meses",
        "extra": "Precio por ojo; alternativa al LASIK para córneas delgadas.",
        "talkingPoint": "Una alternativa al LASIK; con descuentos de tu plan el ahorro es notable."
      },
      {
        "name": "Cirugía de cataratas",
        "aka": "Cataract surgery",
        "costLow": 3500,
        "costHigh": 7000,
        "unit": "por procedimiento",
        "recovery": "Días para tareas ligeras; recuperación completa en 4 a 6 semanas",
        "extra": "Precio por ojo con lente básico; lentes premium o láser suman $1,500-$6,000 por ojo.",
        "talkingPoint": "Con seguro esta cirugía casi siempre está cubierta y evitas pagar miles por ojo."
      },
      {
        "name": "Tratamiento de glaucoma (gotas y control)",
        "aka": "Glaucoma treatment / medication",
        "costLow": 300,
        "costHigh": 2500,
        "unit": "por año",
        "extra": "Gotas genéricas son mucho más baratas; incluye controles periódicos de presión ocular.",
        "talkingPoint": "Detectado y tratado a tiempo, el glaucoma se controla y evitas la ceguera."
      },
      {
        "name": "Cirugía láser de glaucoma (SLT/trabeculoplastia)",
        "aka": "SLT laser trabeculoplasty for glaucoma",
        "costLow": 1000,
        "costHigh": 3000,
        "unit": "por procedimiento",
        "recovery": "24 a 48 horas; molestia leve",
        "extra": "Precio por ojo; reduce la necesidad de gotas diarias.",
        "talkingPoint": "Un procedimiento cubierto que previene la pérdida de visión permanente."
      },
      {
        "name": "Inyección retiniana anti-VEGF",
        "aka": "Anti-VEGF injection (Eylea / Lucentis / Avastin)",
        "costLow": 100,
        "costHigh": 2600,
        "unit": "por procedimiento",
        "recovery": "Horas; leve irritación el mismo día",
        "extra": "Avastin ~$100; Eylea/Lucentis $1,400-$2,600 por inyección. Suelen requerirse varias al año.",
        "talkingPoint": "Sin seguro, un año de inyecciones puede superar los $10,000; el plan te protege."
      },
      {
        "name": "Examen de retina / control diabético",
        "aka": "Dilated retinal exam / diabetic eye exam",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "Imagen de retina o OCT puede añadir $50-$150.",
        "talkingPoint": "Un control anual detecta la retinopatía diabética antes de que dañe la vista."
      },
      {
        "name": "Tratamiento de ojo seco",
        "aka": "Dry eye treatment (Restasis / Xiidra / punctal plugs)",
        "costLow": 200,
        "costHigh": 2000,
        "unit": "por año",
        "extra": "Lágrimas artificiales son baratas; medicamentos de marca o tapones lagrimales elevan el costo.",
        "talkingPoint": "El seguro cubre medicamentos de marca que sin cobertura cuestan cientos al mes."
      },
      {
        "name": "Cirugía de estrabismo",
        "aka": "Strabismus surgery (eye muscle surgery)",
        "costLow": 5000,
        "costHigh": 12000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas; enrojecimiento por varias semanas",
        "extra": "Incluye anestesia y quirófano; más económico ambulatorio que en hospital.",
        "talkingPoint": "Una cirugía cara que el seguro médico suele cubrir por ser funcional, no estética."
      },
      {
        "name": "Lentes de sol con receta",
        "aka": "Prescription sunglasses",
        "costLow": 150,
        "costHigh": 500,
        "unit": "por tratamiento",
        "extra": "Polarizados o fotocromáticos cuestan más; armazón + lentes con protección UV.",
        "talkingPoint": "Con tu beneficio de visión puedes obtenerlos con descuento cada año."
      },
      {
        "name": "Terapia de baja visión",
        "aka": "Low vision rehabilitation / therapy",
        "costLow": 100,
        "costHigh": 500,
        "unit": "por sesión",
        "extra": "Ayudas ópticas (lupas, telescopios) se pagan aparte y cuestan cientos.",
        "talkingPoint": "La rehabilitación visual ayuda a mantener la independencia; mejor con cobertura."
      },
      {
        "name": "Cirugía de párpados (blefaroplastia funcional)",
        "aka": "Eyelid surgery (functional blepharoplasty / ptosis repair)",
        "costLow": 3000,
        "costHigh": 8000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas; hematomas hasta 3 semanas",
        "extra": "La versión funcional (párpado caído que tapa la visión) puede cubrirse; la estética no.",
        "talkingPoint": "Cuando obstruye la visión, el seguro puede cubrir lo que como estética costaría miles."
      },
      {
        "name": "Tomografía de coherencia óptica (OCT)",
        "aka": "OCT retinal imaging scan",
        "costLow": 100,
        "costHigh": 350,
        "unit": "por estudio",
        "extra": "Estudio clave para glaucoma, mácula y diabetes; a menudo se repite anualmente.",
        "talkingPoint": "Un estudio que detecta daño invisible; cubierto, no dudas en hacértelo cada año."
      },
      {
        "name": "Tratamiento de degeneración macular (seguimiento)",
        "aka": "Macular degeneration (AMD) management",
        "costLow": 500,
        "costHigh": 10000,
        "unit": "por año",
        "extra": "Incluye controles, imágenes e inyecciones anti-VEGF según el caso.",
        "talkingPoint": "El manejo continuo es costoso sin seguro; la cobertura preserva tu visión y tu bolsillo."
      },
      {
        "name": "Extracción de cuerpo extraño o abrasión corneal",
        "aka": "Corneal abrasion / foreign body removal (ER or clinic)",
        "costLow": 150,
        "costHigh": 1000,
        "unit": "por tratamiento",
        "recovery": "1 a 3 días para la abrasión",
        "extra": "En sala de emergencias cuesta mucho más que en consultorio oftalmológico.",
        "talkingPoint": "Una urgencia ocular en la sala de emergencias sale carísima sin cobertura."
      },
      {
        "name": "Cirugía de pterigión",
        "aka": "Pterygium removal surgery",
        "costLow": 1500,
        "costHigh": 5000,
        "unit": "por procedimiento",
        "recovery": "1 a 2 semanas; enrojecimiento hasta 1 mes",
        "extra": "Precio por ojo; incluye injerto de conjuntiva en muchos casos.",
        "talkingPoint": "Retirar este crecimiento a tiempo evita que afecte la córnea y la visión."
      },
      {
        "name": "Adaptación de lentes de contacto especiales (queratocono/esclerales)",
        "aka": "Specialty contact lens fitting (scleral / keratoconus)",
        "costLow": 1000,
        "costHigh": 4000,
        "unit": "por tratamiento",
        "extra": "Incluye adaptación y lentes esclerales o RGP; suministro anual aparte.",
        "talkingPoint": "Estos lentes médicos son carísimos sin cobertura; el seguro reduce mucho el gasto."
      }
    ]
  },
  {
    "id": "vacunas",
    "title": "Vacunas y preventivo",
    "items": [
      {
        "name": "Vacuna contra la gripe (influenza)",
        "aka": "Flu shot / Fluzone / Flublok (CPT 90686)",
        "costLow": 20,
        "costHigh": 90,
        "unit": "por envase",
        "extra": "Más cara la versión de alta dosis para mayores de 65 (Fluzone High-Dose).",
        "talkingPoint": "Con seguro es $0; sin él, pagas cada temporada y arriesgas una gripe que te cuesta días de trabajo."
      },
      {
        "name": "Vacuna contra la COVID-19",
        "aka": "COVID-19 vaccine / Pfizer / Moderna",
        "costLow": 130,
        "costHigh": 210,
        "unit": "por envase",
        "extra": "Precio comercial de lista; antes era gratis con fondos federales.",
        "talkingPoint": "Tras el fin del programa federal ronda los $130-$200; el seguro la cubre sin copago."
      },
      {
        "name": "Vacuna del herpes zóster (culebrilla)",
        "aka": "Shingrix (CPT 90750)",
        "costLow": 200,
        "costHigh": 360,
        "unit": "por envase",
        "extra": "Requiere 2 dosis; precio efectivo GoodRx cerca de $180-$200 por dosis.",
        "talkingPoint": "Son 2 dosis: hasta $700 sin seguro para evitar un zóster que puede dejar dolor por meses."
      },
      {
        "name": "Vacuna contra el VPH",
        "aka": "Gardasil 9 (CPT 90651)",
        "costLow": 240,
        "costHigh": 410,
        "unit": "por envase",
        "extra": "2 o 3 dosis según la edad; lista del fabricante ~$363/dosis.",
        "talkingPoint": "La serie completa supera los $1,000 sin seguro; previene cánceres que costarían decenas de miles tratar."
      },
      {
        "name": "Vacuna Tdap (tétanos, difteria, tos ferina)",
        "aka": "Tdap / Adacel / Boostrix",
        "costLow": 45,
        "costHigh": 110,
        "unit": "por envase",
        "extra": "Refuerzo Td sencillo suele costar menos ($30-$70).",
        "talkingPoint": "Un refuerzo barato con seguro evita una visita de urgencias por una herida infectada."
      },
      {
        "name": "Vacuna antineumocócica",
        "aka": "Prevnar 20 / Pneumovax 23 (CPT 90677)",
        "costLow": 120,
        "costHigh": 330,
        "unit": "por envase",
        "extra": "Prevnar 20 (conjugada) es más cara que Pneumovax 23 (polisacárida).",
        "talkingPoint": "Prevenir una neumonía neumocócica evita hospitalizaciones de miles de dólares."
      },
      {
        "name": "Vacuna contra la hepatitis A",
        "aka": "Havrix / Vaqta",
        "costLow": 80,
        "costHigh": 200,
        "unit": "por envase",
        "extra": "Serie de 2 dosis con 6 meses de separación.",
        "talkingPoint": "Dos dosis te protegen de por vida; el seguro las cubre como preventivo sin copago."
      },
      {
        "name": "Vacuna contra la hepatitis B",
        "aka": "Engerix-B / Heplisav-B",
        "costLow": 75,
        "costHigh": 180,
        "unit": "por envase",
        "extra": "Heplisav-B usa 2 dosis; las tradicionales requieren 3.",
        "talkingPoint": "Protección contra un virus que causa cáncer de hígado; gratuita con seguro preventivo."
      },
      {
        "name": "Vacuna triple viral (sarampión, paperas, rubéola)",
        "aka": "MMR / M-M-R II",
        "costLow": 90,
        "costHigh": 200,
        "unit": "por envase",
        "extra": "Serie de 2 dosis en la infancia; una en adultos no inmunes.",
        "talkingPoint": "El sarampión ha resurgido; una dosis cubierta por seguro evita brotes costosos."
      },
      {
        "name": "Vacuna contra la meningitis",
        "aka": "MenACWY (Menveo) / MenB (Bexsero, Trumenba)",
        "costLow": 150,
        "costHigh": 350,
        "unit": "por envase",
        "extra": "MenB requiere 2-3 dosis y encarece la serie.",
        "talkingPoint": "Obligatoria en muchas universidades; el seguro la cubre y evita un pago fuerte de bolsillo."
      },
      {
        "name": "Vacuna contra el VRS (virus sincitial respiratorio)",
        "aka": "RSV vaccine / Abrysvo / Arexvy",
        "costLow": 300,
        "costHigh": 420,
        "unit": "por envase",
        "extra": "Dosis única; también indicada en embarazo (Abrysvo).",
        "talkingPoint": "Recomendada para mayores de 60; una sola dosis cara sin seguro, gratis con cobertura preventiva."
      },
      {
        "name": "Vacuna contra la fiebre amarilla",
        "aka": "Yellow fever / YF-VAX",
        "costLow": 150,
        "costHigh": 350,
        "unit": "por envase",
        "extra": "Solo en centros certificados; incluye certificado internacional.",
        "talkingPoint": "Vacuna de viaje que rara vez cubre el seguro; planifícala antes de viajar y ahorra."
      },
      {
        "name": "Vacuna contra la fiebre tifoidea",
        "aka": "Typhoid / Typhim Vi / Vivotif",
        "costLow": 90,
        "costHigh": 250,
        "unit": "por envase",
        "extra": "Versión oral (Vivotif) o inyectable; la oral son 4 cápsulas.",
        "talkingPoint": "Vacuna de viajero; sin seguro pagas todo, planifícala con tiempo."
      },
      {
        "name": "Vacuna contra la rabia (preexposición)",
        "aka": "Rabies vaccine / RabAvert / Imovax",
        "costLow": 300,
        "costHigh": 1200,
        "unit": "por tratamiento",
        "extra": "Serie de 2-3 dosis; la profilaxis postexposición cuesta mucho más.",
        "talkingPoint": "La serie preexposición es carísima sin seguro; imprescindible para ciertos viajes y trabajos."
      },
      {
        "name": "Vacuna contra la varicela",
        "aka": "Varivax (chickenpox)",
        "costLow": 140,
        "costHigh": 230,
        "unit": "por envase",
        "extra": "Serie de 2 dosis para no inmunes.",
        "talkingPoint": "Dos dosis cubiertas por seguro evitan una varicela adulta, mucho más grave y costosa."
      },
      {
        "name": "Examen físico anual (chequeo preventivo)",
        "aka": "Annual physical / wellness exam",
        "costLow": 150,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "Los análisis de laboratorio se cobran aparte si no son de tamizaje.",
        "talkingPoint": "Con seguro es gratis una vez al año; detectar temprano ahorra miles en tratamientos."
      },
      {
        "name": "Colonoscopia de tamizaje",
        "aka": "Screening colonoscopy (CPT 45378)",
        "costLow": 1250,
        "costHigh": 4800,
        "unit": "por procedimiento",
        "recovery": "1 día (por la sedación); actividad normal al día siguiente",
        "extra": "Incluye sedación e histopatología; centros ambulatorios cobran menos que hospitales.",
        "talkingPoint": "Sin seguro paga hasta $4,800; con cobertura es $0 y previene el cáncer de colon."
      },
      {
        "name": "Mamografía de tamizaje",
        "aka": "Screening mammogram (2D/3D)",
        "costLow": 100,
        "costHigh": 350,
        "unit": "por estudio",
        "extra": "La 3D (tomosíntesis) suma $50-$150; centros independientes son más baratos que hospitales.",
        "talkingPoint": "El seguro la cubre sin copago cada año; detectar temprano el cáncer de mama salva vidas y dinero."
      },
      {
        "name": "Papanicolau (citología cervical)",
        "aka": "Pap smear (CPT 88175)",
        "costLow": 40,
        "costHigh": 250,
        "unit": "por estudio",
        "extra": "Puede combinarse con prueba de VPH, lo que sube el precio.",
        "talkingPoint": "Prueba de bajo costo que previene el cáncer de cuello uterino; gratis como preventivo."
      },
      {
        "name": "Tamizaje de PSA (antígeno prostático)",
        "aka": "PSA test (CPT 84153)",
        "costLow": 40,
        "costHigh": 110,
        "unit": "por estudio",
        "extra": "Solo el análisis de sangre; la consulta se cobra aparte.",
        "talkingPoint": "Análisis de sangre económico que ayuda a detectar cáncer de próstata temprano."
      },
      {
        "name": "Revisión de piel (tamizaje de cáncer)",
        "aka": "Skin cancer screening / dermatology exam",
        "costLow": 150,
        "costHigh": 300,
        "unit": "por visita",
        "extra": "Una biopsia de una lesión sospechosa se cobra por separado.",
        "talkingPoint": "Detectar un melanoma temprano cuesta poco; tratarlo tarde, una fortuna."
      },
      {
        "name": "Densitometría ósea (densidad ósea)",
        "aka": "DEXA / bone density scan (CPT 77080)",
        "costLow": 125,
        "costHigh": 300,
        "unit": "por estudio",
        "extra": "Recomendada en mujeres mayores de 65; cubierta como preventivo.",
        "talkingPoint": "Detecta osteoporosis antes de una fractura de cadera que cuesta decenas de miles."
      },
      {
        "name": "Tamizaje de diabetes",
        "aka": "HbA1c / fasting glucose (CPT 83036)",
        "costLow": 10,
        "costHigh": 80,
        "unit": "por estudio",
        "extra": "Hemoglobina glicosilada (A1c) o glucosa en ayunas.",
        "talkingPoint": "Un análisis barato detecta prediabetes y evita complicaciones costosas de por vida."
      },
      {
        "name": "Control de presión arterial",
        "aka": "Blood pressure screening",
        "costLow": 0,
        "costHigh": 50,
        "unit": "por visita",
        "extra": "Incluido en chequeos y muchas farmacias lo ofrecen gratis.",
        "talkingPoint": "Gratis o casi gratis; controlar la hipertensión previene infartos y derrames carísimos."
      },
      {
        "name": "Tamizaje de colesterol (perfil lipídico)",
        "aka": "Lipid panel (CPT 80061)",
        "costLow": 15,
        "costHigh": 100,
        "unit": "por estudio",
        "extra": "Suele requerir ayuno de 9-12 horas.",
        "talkingPoint": "Análisis económico que anticipa riesgo cardiovascular; gratis como preventivo con seguro."
      },
      {
        "name": "Prueba de detección de VIH",
        "aka": "HIV screening test",
        "costLow": 20,
        "costHigh": 150,
        "unit": "por estudio",
        "extra": "Cubierta como preventivo por la ACA; hay pruebas rápidas gratuitas en clínicas públicas.",
        "talkingPoint": "Prueba de bajo costo recomendada de rutina; el diagnóstico temprano cambia todo."
      },
      {
        "name": "Tamizaje de cáncer de colon en heces",
        "aka": "Cologuard / FIT stool test",
        "costLow": 25,
        "costHigh": 650,
        "unit": "por estudio",
        "extra": "El FIT cuesta $25-$50; Cologuard (ADN) ronda los $500-$650.",
        "talkingPoint": "Alternativa sin sedación a la colonoscopia; cubierta como preventivo con seguro."
      },
      {
        "name": "Prueba de tuberculosis",
        "aka": "TB test / PPD / QuantiFERON",
        "costLow": 30,
        "costHigh": 150,
        "unit": "por estudio",
        "extra": "La prueba de sangre (QuantiFERON) cuesta más que la cutánea (PPD).",
        "talkingPoint": "Requerida para muchos empleos de salud; barata y evita contagios costosos."
      },
      {
        "name": "Tamizaje de aneurisma de aorta abdominal",
        "aka": "AAA ultrasound screening (CPT 76706)",
        "costLow": 75,
        "costHigh": 300,
        "unit": "por estudio",
        "extra": "Cubierta una vez para hombres de 65-75 que fumaron.",
        "talkingPoint": "Ecografía única recomendada para exfumadores mayores; previene una rotura mortal."
      }
    ]
  },
  {
    "id": "hospitalizacion",
    "title": "Hospitalización",
    "items": [
      {
        "name": "Día de hospitalización (habitación privada)",
        "aka": "Private room, per diem inpatient day",
        "costLow": 2500,
        "costHigh": 4500,
        "unit": "por día",
        "extra": "No incluye médicos, medicamentos ni estudios; solo la habitación y enfermería.",
        "talkingPoint": "Una sola noche puede costar más que tu prima anual del seguro."
      },
      {
        "name": "Día en habitación semiprivada",
        "aka": "Semi-private room, per diem",
        "costLow": 1800,
        "costHigh": 3500,
        "unit": "por día",
        "extra": "Suele ser 15-25% más barata que la privada, pero igual de costosa sin seguro.",
        "talkingPoint": "Compartir habitación no te libra de una factura de miles de dólares por noche."
      },
      {
        "name": "Día en UCI (cuidados intensivos)",
        "aka": "ICU day, intensive care unit",
        "costLow": 4000,
        "costHigh": 12000,
        "unit": "por día",
        "extra": "El costo sube con ventilación mecánica y monitoreo continuo.",
        "talkingPoint": "Un accidente o un infarto pueden significar $10,000 diarios que el seguro absorbe por ti."
      },
      {
        "name": "Día en cuidados intermedios (step-down)",
        "aka": "Step-down / intermediate care unit day",
        "costLow": 2500,
        "costHigh": 5000,
        "unit": "por día",
        "extra": "Se usa tras salir de UCI antes de pasar a piso general.",
        "talkingPoint": "El nivel intermedio entre UCI y planta también drena tus ahorros rápido."
      },
      {
        "name": "Día en UCI neonatal (NICU)",
        "aka": "NICU day, neonatal intensive care",
        "costLow": 3000,
        "costHigh": 10000,
        "unit": "por día",
        "extra": "Estancias de varias semanas son comunes, sumando cientos de miles.",
        "talkingPoint": "Un bebé prematuro puede pasar semanas en NICU; asegurar el embarazo lo cubre."
      },
      {
        "name": "Estancia de observación",
        "aka": "Observation stay",
        "costLow": 1500,
        "costHigh": 8000,
        "unit": "por día",
        "extra": "Cuenta como ambulatorio; no aplica para cobertura posterior de enfermería especializada.",
        "talkingPoint": "Estar 'en observación' y no admitido puede dejarte una factura sorpresa completa."
      },
      {
        "name": "Tarifa de instalación de ER, Nivel 1 (menor)",
        "aka": "ER facility fee, level 1 (minor)",
        "costLow": 150,
        "costHigh": 600,
        "unit": "por visita",
        "extra": "Es solo la tarifa de instalación; sumar médico y estudios.",
        "talkingPoint": "Con seguro, una consulta urgente menor se resuelve por un copago pequeño."
      },
      {
        "name": "Tarifa de instalación de ER, Nivel 3 (moderado)",
        "aka": "ER facility fee, level 3 (moderate)",
        "costLow": 600,
        "costHigh": 1800,
        "unit": "por visita",
        "extra": "Nivel más frecuente de facturación en salas de emergencia.",
        "talkingPoint": "La mayoría de visitas caen aquí y una clínica urgente con seguro cuesta una fracción."
      },
      {
        "name": "Tarifa de instalación de ER, Nivel 5 (crítico)",
        "aka": "ER facility fee, level 5 (critical/life-threatening)",
        "costLow": 1200,
        "costHigh": 3500,
        "unit": "por visita",
        "extra": "Solo la instalación; los procedimientos críticos se cobran aparte.",
        "talkingPoint": "Una emergencia grave dispara la factura antes de que te vea el médico."
      },
      {
        "name": "Tarifa de quirófano / instalación quirúrgica",
        "aka": "Operating room facility fee",
        "costLow": 2500,
        "costHigh": 9000,
        "unit": "por hora",
        "extra": "Cargo base primera hora + minutos adicionales; no incluye cirujano ni anestesia.",
        "talkingPoint": "El quirófano se cobra por hora aparte del cirujano; asegurarte evita esa acumulación."
      },
      {
        "name": "Sala de recuperación post-anestesia (PACU)",
        "aka": "Recovery room / PACU",
        "costLow": 1000,
        "costHigh": 3500,
        "unit": "por procedimiento",
        "extra": "Se factura por tiempo de monitoreo tras la cirugía.",
        "talkingPoint": "Despertar de la anestesia también tiene su propia factura separada."
      },
      {
        "name": "Estancia hospitalaria promedio de 3 días",
        "aka": "Average 3-day inpatient stay",
        "costLow": 10000,
        "costHigh": 30000,
        "unit": "tratamiento",
        "recovery": "Variable según diagnóstico",
        "extra": "Promedio nacional ronda los $16,000-$20,000 sin seguro.",
        "talkingPoint": "Tres días de hospital cuestan más que un auto; el seguro convierte eso en un copago."
      },
      {
        "name": "Día en centro de enfermería especializada (SNF)",
        "aka": "Skilled nursing facility day (SNF)",
        "costLow": 350,
        "costHigh": 800,
        "unit": "por día",
        "extra": "Medicare cubre solo tras 3 días de admisión previa; observación no cuenta.",
        "talkingPoint": "La recuperación tras una cirugía puede requerir semanas de SNF que el seguro cubre."
      },
      {
        "name": "Día en centro de rehabilitación hospitalaria",
        "aka": "Inpatient rehabilitation facility day",
        "costLow": 500,
        "costHigh": 2000,
        "unit": "por día",
        "recovery": "Semanas a meses",
        "extra": "Instalaciones de alta gama superan los $1,000 diarios.",
        "talkingPoint": "Recuperarte de un ACV o fractura mayor implica días de rehab de alto costo."
      },
      {
        "name": "Ambulancia aérea en helicóptero",
        "aka": "Air ambulance, helicopter transport",
        "costLow": 12000,
        "costHigh": 50000,
        "unit": "por traslado",
        "extra": "Cargo mediano nacional ronda los $36,000-$39,000.",
        "talkingPoint": "Un rescate en helicóptero puede costar más que tu salario anual sin cobertura."
      },
      {
        "name": "Ambulancia aérea en avión (larga distancia)",
        "aka": "Air ambulance, fixed-wing transport",
        "costLow": 25000,
        "costHigh": 200000,
        "unit": "por traslado",
        "extra": "El precio escala con distancia y equipo médico a bordo.",
        "talkingPoint": "Un traslado interestatal en avión medicalizado es de los gastos más ruinosos sin seguro."
      },
      {
        "name": "Ambulancia terrestre",
        "aka": "Ground ambulance transport",
        "costLow": 500,
        "costHigh": 2500,
        "unit": "por traslado",
        "extra": "El costo sube con soporte vital avanzado (ALS) y millaje.",
        "talkingPoint": "Hasta el viaje en ambulancia a la esquina se factura por separado; el seguro lo amortigua."
      },
      {
        "name": "Tarifa de admisión / cargo por telemetría diaria",
        "aka": "Telemetry monitoring, cardiac, per day",
        "costLow": 1000,
        "costHigh": 3000,
        "unit": "por día",
        "extra": "Común en pacientes cardíacos; se cobra encima de la habitación.",
        "talkingPoint": "El monitoreo cardíaco continuo suma un cargo diario extra a tu estancia."
      }
    ]
  },
  {
    "id": "terapias",
    "title": "Terapias y rehabilitación",
    "items": [
      {
        "name": "Sesión de fisioterapia (PT)",
        "aka": "Physical therapy session (CPT 97110)",
        "costLow": 75,
        "costHigh": 350,
        "unit": "por sesión",
        "extra": "Un curso típico de 6 a 18 sesiones cuesta $900-$4,000 sin seguro.",
        "talkingPoint": "Con seguro pagas un copago pequeño; sin él, cada semana de rehabilitación se acumula rápido."
      },
      {
        "name": "Evaluación inicial de fisioterapia",
        "aka": "PT initial evaluation (CPT 97161-97163)",
        "costLow": 150,
        "costHigh": 400,
        "unit": "por sesión",
        "extra": "Más costosa que las sesiones de seguimiento.",
        "talkingPoint": "La primera visita es la más cara; el seguro la absorbe casi por completo."
      },
      {
        "name": "Sesión de terapia ocupacional (OT)",
        "aka": "Occupational therapy session (CPT 97530)",
        "costLow": 75,
        "costHigh": 250,
        "unit": "por sesión",
        "extra": "Frecuente tras cirugía de mano, ACV o lesión.",
        "talkingPoint": "Recuperar la independencia diaria no debería costarte un salario mensual."
      },
      {
        "name": "Sesión de terapia del lenguaje y habla",
        "aka": "Speech-language therapy (CPT 92507)",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por sesión",
        "extra": "Suele requerir múltiples sesiones semanales por meses.",
        "talkingPoint": "Un plan de terapia largo para un niño se vuelve inviable sin cobertura."
      },
      {
        "name": "Visita quiropráctica",
        "aka": "Chiropractic adjustment (CPT 98940)",
        "costLow": 30,
        "costHigh": 200,
        "unit": "por visita",
        "extra": "Evaluación inicial $65-$200; ajustes de seguimiento desde $30.",
        "talkingPoint": "El dolor de espalda crónico exige visitas repetidas: con seguro cuestan una fracción."
      },
      {
        "name": "Sesión de acupuntura",
        "aka": "Acupuncture (CPT 97810)",
        "costLow": 70,
        "costHigh": 200,
        "unit": "por sesión",
        "extra": "Clínicas comunitarias desde $20-$50; primera consulta $100-$300.",
        "talkingPoint": "Muchos planes ya cubren acupuntura para dolor; sin seguro pagas todo de tu bolsillo."
      },
      {
        "name": "Sesión de hemodiálisis",
        "aka": "Hemodialysis session",
        "costLow": 500,
        "costHigh": 1000,
        "unit": "por sesión",
        "extra": "En urgencias hospitalarias puede llegar a $10,000 por sesión.",
        "talkingPoint": "Tres sesiones por semana suman más de $70,000 al año sin seguro: la cobertura es vital."
      },
      {
        "name": "Diálisis peritoneal",
        "aka": "Peritoneal dialysis",
        "costLow": 3000,
        "costHigh": 6000,
        "unit": "por mes",
        "extra": "Se hace en casa; el equipo y suministros son el grueso del costo.",
        "talkingPoint": "Una enfermedad renal sin seguro es una factura mensual imposible de sostener."
      },
      {
        "name": "Sesión/ciclo de quimioterapia",
        "aka": "Chemotherapy cycle",
        "costLow": 10000,
        "costHigh": 30000,
        "unit": "por ciclo",
        "extra": "Los uninsured pagan de 2 a 43 veces la tarifa Medicare por el mismo tratamiento.",
        "talkingPoint": "Un diagnóstico de cáncer sin seguro puede costar cientos de miles: asegurarte protege tu patrimonio."
      },
      {
        "name": "Curso de radioterapia",
        "aka": "Radiation therapy course (external beam/IMRT)",
        "costLow": 10000,
        "costHigh": 50000,
        "unit": "tratamiento",
        "extra": "Incluye múltiples sesiones; IMRT y braquiterapia elevan el precio.",
        "talkingPoint": "Prevenir con chequeos cubiertos evita cursos de radiación que cuestan como un auto."
      },
      {
        "name": "Terapia de infusión intravenosa",
        "aka": "IV infusion therapy",
        "costLow": 200,
        "costHigh": 1000,
        "unit": "por sesión",
        "extra": "El fármaco infundido puede multiplicar el costo total.",
        "talkingPoint": "Las infusiones biológicas repetidas sin cobertura vacían el ahorro en meses."
      },
      {
        "name": "Cuidado de heridas",
        "aka": "Wound care visit",
        "costLow": 100,
        "costHigh": 500,
        "unit": "por visita",
        "extra": "Heridas crónicas requieren visitas semanales prolongadas.",
        "talkingPoint": "Una úlcera diabética mal atendida cuesta más que años de prevención cubierta."
      },
      {
        "name": "Sesión de rehabilitación cardíaca",
        "aka": "Cardiac rehabilitation (CPT 93798)",
        "costLow": 100,
        "costHigh": 250,
        "unit": "por sesión",
        "extra": "Programa estándar de 36 sesiones supervisadas.",
        "talkingPoint": "Tras un infarto necesitas 36 sesiones; el seguro las cubre y salvan tu corazón."
      },
      {
        "name": "Sesión de rehabilitación pulmonar",
        "aka": "Pulmonary rehabilitation (CPT 94625)",
        "costLow": 100,
        "costHigh": 300,
        "unit": "por sesión",
        "extra": "Ejercicio y educación supervisados por semanas.",
        "talkingPoint": "Con EPOC, respirar mejor no debería depender de si puedes pagar cada sesión."
      },
      {
        "name": "Visita de enfermería a domicilio",
        "aka": "Home health nursing visit",
        "costLow": 100,
        "costHigh": 350,
        "unit": "por visita",
        "extra": "Común tras hospitalización o cirugía mayor.",
        "talkingPoint": "Recuperarte en casa con seguro cuesta un copago; sin él, cada visita se paga completa."
      },
      {
        "name": "Sesión de masaje terapéutico médico",
        "aka": "Medical massage therapy (CPT 97124)",
        "costLow": 60,
        "costHigh": 150,
        "unit": "por sesión",
        "extra": "Cubierto solo si es prescrito como tratamiento.",
        "talkingPoint": "Cuando es parte de tu rehabilitación, el seguro puede cubrirlo en vez de pagarlo tú."
      },
      {
        "name": "Terapia de oxígeno hiperbárico (HBOT)",
        "aka": "Hyperbaric oxygen therapy (HBOT)",
        "costLow": 150,
        "costHigh": 650,
        "unit": "por sesión",
        "extra": "Clínicas independientes 30-60% más baratas que hospitales.",
        "talkingPoint": "Un curso de 20-40 sesiones para una herida grave supera los $20,000 sin cobertura."
      },
      {
        "name": "Prótesis de pierna",
        "aka": "Prosthetic leg (transtibial/transfemoral)",
        "costLow": 5000,
        "costHigh": 70000,
        "unit": "tratamiento",
        "recovery": "Adaptación y entrenamiento de marcha de 3 a 6 meses",
        "extra": "Básica bajo rodilla desde $3,000; con rodilla computarizada supera $70,000.",
        "talkingPoint": "Una prótesis avanzada cuesta como una casa: sin seguro, recuperar la movilidad es un lujo."
      },
      {
        "name": "Silla de ruedas manual (DME)",
        "aka": "Manual wheelchair (durable medical equipment)",
        "costLow": 100,
        "costHigh": 1000,
        "unit": "tratamiento",
        "extra": "Modelos ligeros y personalizados cuestan más.",
        "talkingPoint": "El equipo médico duradero suele estar cubierto: pregunta antes de pagarlo completo."
      },
      {
        "name": "Silla de ruedas eléctrica (DME)",
        "aka": "Power wheelchair / scooter (DME)",
        "costLow": 1500,
        "costHigh": 30000,
        "unit": "tratamiento",
        "extra": "Modelos con inclinación y controles especiales son los más caros.",
        "talkingPoint": "Una silla motorizada cuesta miles; con seguro pagas solo una parte del precio."
      },
      {
        "name": "Equipo CPAP para apnea del sueño",
        "aka": "CPAP/APAP machine",
        "costLow": 300,
        "costHigh": 1500,
        "unit": "tratamiento",
        "extra": "Refurbished $200-$900; los BiPAP llegan a $3,000.",
        "talkingPoint": "Tratar la apnea previene infartos y accidentes; el seguro cubre el equipo y los suministros."
      },
      {
        "name": "Sesión de terapia física acuática",
        "aka": "Aquatic therapy (CPT 97113)",
        "costLow": 50,
        "costHigh": 150,
        "unit": "por sesión",
        "extra": "Ideal tras cirugía articular o para artritis.",
        "talkingPoint": "Rehabilitar sin impacto en el agua es efectivo; que el costo no te detenga."
      },
      {
        "name": "Órtesis o férula ortopédica (brace)",
        "aka": "Orthotic brace / splint (DME)",
        "costLow": 50,
        "costHigh": 1000,
        "unit": "tratamiento",
        "extra": "Órtesis de rodilla o espinales a medida son las más costosas.",
        "talkingPoint": "Las órtesis a medida son caras; muchas están cubiertas como equipo médico."
      },
      {
        "name": "Día de rehabilitación hospitalaria (ACV/lesión)",
        "aka": "Inpatient rehabilitation facility (per diem)",
        "costLow": 1500,
        "costHigh": 2500,
        "unit": "por día",
        "recovery": "Programas de 1 a 3 semanas o más según la lesión",
        "extra": "Estancias suelen durar de 1 a 3 semanas.",
        "talkingPoint": "Recuperarte de un ACV puede tomar semanas internado: sin seguro es económicamente devastador."
      },
      {
        "name": "Oxígeno domiciliario (concentrador)",
        "aka": "Home oxygen concentrator (rental)",
        "costLow": 200,
        "costHigh": 600,
        "unit": "por mes",
        "extra": "Compra del concentrador $600-$2,000; el alquiler suele ser mensual.",
        "talkingPoint": "Para enfermedades pulmonares crónicas, el seguro cubre el alquiler mensual del oxígeno."
      },
      {
        "name": "Andador o muletas (DME)",
        "aka": "Walker / crutches (durable medical equipment)",
        "costLow": 20,
        "costHigh": 300,
        "unit": "tratamiento",
        "extra": "Andadores con ruedas y asiento (rollators) cuestan más.",
        "talkingPoint": "Hasta un andador básico se cubre como equipo médico: no lo pagues de más."
      }
    ]
  },
  {
    "id": "cronicas",
    "title": "Condiciones crónicas y preexistentes",
    "items": [
      {
        "name": "Cáncer de mama",
        "aka": "Breast cancer treatment",
        "costLow": 50000,
        "costHigh": 300000,
        "unit": "por año",
        "recovery": "6 a 12 meses tras cirugía, quimio y radioterapia",
        "extra": "El primer año es el más caro: cirugía + quimio + radiación; detección temprana reduce mucho el costo",
        "talkingPoint": "Una mamografía cubierta cuesta casi nada; el cáncer sin seguro puede costar seis cifras."
      },
      {
        "name": "Cáncer de pulmón",
        "aka": "Lung cancer treatment",
        "costLow": 60000,
        "costHigh": 400000,
        "unit": "por año",
        "recovery": "Variable según etapa; meses de tratamiento continuo",
        "extra": "Inmunoterapia y terapias dirigidas superan los $150,000/año",
        "talkingPoint": "La inmunoterapia sin seguro es impagable; asegúrate antes de que un diagnóstico te alcance."
      },
      {
        "name": "Cáncer de colon",
        "aka": "Colorectal cancer treatment",
        "costLow": 50000,
        "costHigh": 350000,
        "unit": "por año",
        "recovery": "4 a 8 semanas tras cirugía; meses con quimioterapia",
        "extra": "Una colonoscopia preventiva evita el 90% de casos avanzados",
        "talkingPoint": "Un chequeo preventivo vale poco; tratar el colon avanzado sin seguro te arruina."
      },
      {
        "name": "Cáncer de próstata",
        "aka": "Prostate cancer treatment",
        "costLow": 30000,
        "costHigh": 180000,
        "unit": "por año",
        "recovery": "4 a 6 semanas tras cirugía; semanas con radioterapia",
        "extra": "Vigilancia activa es barata; cirugía y radiación disparan el costo",
        "talkingPoint": "Detectarlo a tiempo con seguro cambia todo frente a un tratamiento de $180,000."
      },
      {
        "name": "Cáncer de páncreas",
        "aka": "Pancreatic cancer treatment",
        "costLow": 60000,
        "costHigh": 300000,
        "unit": "por año",
        "recovery": "Prolongada; cirugía de Whipple requiere meses",
        "extra": "Uno de los más costosos y agresivos; tratamiento continuo",
        "talkingPoint": "Sin seguro, este diagnóstico consume ahorros de toda una vida en meses."
      },
      {
        "name": "Anemia de células falciformes",
        "aka": "Sickle cell disease",
        "costLow": 20000,
        "costHigh": 100000,
        "unit": "por año",
        "extra": "Crisis de dolor y transfusiones frecuentes elevan el gasto",
        "talkingPoint": "Una condición de por vida: el seguro es la diferencia entre manejarla o quebrar cada año."
      },
      {
        "name": "Enfermedad de Alzheimer (avanzado)",
        "aka": "Alzheimer's disease, advanced care",
        "costLow": 25000,
        "costHigh": 100000,
        "unit": "por año",
        "extra": "El cuidado en residencia especializada puede superar los $100,000/año",
        "talkingPoint": "El cuidado prolongado sin cobertura arrastra a toda la familia; planifícalo con seguro."
      },
      {
        "name": "Alzheimer temprano",
        "aka": "Early Alzheimer's (lecanemab / donanemab)",
        "costLow": 28000,
        "costHigh": 60000,
        "unit": "por año",
        "extra": "Los nuevos anticuerpos (lecanemab) cuestan ~$26,500/año solo el fármaco, más infusiones",
        "talkingPoint": "Los tratamientos que frenan el deterioro temprano solo son accesibles con buen seguro."
      },
      {
        "name": "Diabetes tipo 1",
        "aka": "Type 1 diabetes",
        "costLow": 6000,
        "costHigh": 20000,
        "unit": "por año",
        "extra": "Insulina, monitor continuo (CGM) y bomba; el CGM solo cuesta $1,200–$3,600/año",
        "talkingPoint": "La insulina sin seguro racionada mata; con cobertura, mantienes la vida bajo control."
      },
      {
        "name": "Diabetes tipo 2",
        "aka": "Type 2 diabetes",
        "costLow": 3000,
        "costHigh": 12000,
        "unit": "por año",
        "extra": "Fármacos GLP-1 como Ozempic elevan mucho el costo; metformina genérica es barata",
        "talkingPoint": "Prevenirla con hábitos y chequeos cubiertos es mil veces más barato que tratarla."
      },
      {
        "name": "Enfermedad cardíaca / coronaria",
        "aka": "Coronary artery disease",
        "costLow": 10000,
        "costHigh": 40000,
        "unit": "por año",
        "recovery": "4 a 6 semanas tras colocación de stent",
        "extra": "Un stent o cateterismo sin seguro añade decenas de miles",
        "talkingPoint": "Controlar presión y colesterol con seguro previene infartos que cuestan una fortuna."
      },
      {
        "name": "Insuficiencia cardíaca",
        "aka": "Heart failure",
        "costLow": 20000,
        "costHigh": 45000,
        "unit": "por año",
        "extra": "Las hospitalizaciones por descompensación son el mayor gasto (~$16,000 cada una)",
        "talkingPoint": "Cada reingreso hospitalario sin seguro es devastador; la cobertura evita la ruina."
      },
      {
        "name": "EPOC",
        "aka": "COPD (chronic obstructive pulmonary disease)",
        "costLow": 6000,
        "costHigh": 25000,
        "unit": "por año",
        "extra": "Las crisis con hospitalización disparan el costo; inhaladores de marca son caros",
        "talkingPoint": "Dejar de fumar y tratar a tiempo con seguro evita ingresos que cuestan miles."
      },
      {
        "name": "Asma",
        "aka": "Asthma",
        "costLow": 3000,
        "costHigh": 10000,
        "unit": "por año",
        "extra": "Los biológicos (Dupixent) para asma grave superan los $30,000/año",
        "talkingPoint": "Un inhalador cubierto evita visitas de urgencia que cuestan miles sin seguro."
      },
      {
        "name": "Enfermedad renal crónica (sin diálisis)",
        "aka": "Chronic kidney disease, pre-dialysis",
        "costLow": 8000,
        "costHigh": 25000,
        "unit": "por año",
        "extra": "El manejo temprano retrasa la diálisis, mucho más costosa",
        "talkingPoint": "Frenar el daño renal a tiempo con seguro te aleja de una diálisis de $90,000/año."
      },
      {
        "name": "Diálisis (enfermedad renal terminal)",
        "aka": "Dialysis (end-stage renal disease)",
        "costLow": 72000,
        "costHigh": 100000,
        "unit": "por año",
        "extra": "3 sesiones/semana a ~$500 c/u; la diálisis de urgencia hospitalaria es aún más cara",
        "talkingPoint": "Sin seguro, la diálisis cuesta lo mismo que una casa cada año; asegúrate antes."
      },
      {
        "name": "VIH",
        "aka": "HIV / antiretroviral therapy",
        "costLow": 30000,
        "costHigh": 50000,
        "unit": "por año",
        "extra": "La terapia antirretroviral (ej. Biktarvy) supera los $48,000/año a precio de lista",
        "talkingPoint": "Con tratamiento cubierto se vive una vida plena; sin seguro los fármacos son inalcanzables."
      },
      {
        "name": "Artritis reumatoide",
        "aka": "Rheumatoid arthritis",
        "costLow": 20000,
        "costHigh": 100000,
        "unit": "por año",
        "extra": "Biológicos como Humira cuestan $80,000–$100,000/año; metotrexato genérico es barato",
        "talkingPoint": "Los biológicos que evitan la discapacidad solo son viables con un buen seguro."
      },
      {
        "name": "Hipertensión",
        "aka": "Hypertension (high blood pressure)",
        "costLow": 1000,
        "costHigh": 5000,
        "unit": "por año",
        "extra": "Genéricos muy baratos; el riesgo real son las complicaciones (infarto, ACV)",
        "talkingPoint": "Controlarla con genéricos cubiertos evita infartos y derrames que cuestan una fortuna."
      },
      {
        "name": "Depresión",
        "aka": "Depression",
        "costLow": 2000,
        "costHigh": 8000,
        "unit": "por año",
        "extra": "La terapia ($100–$200/sesión) es el mayor costo; antidepresivos genéricos son baratos",
        "talkingPoint": "Con seguro accedes a terapia y medicación; sin él, la ayuda se vuelve un lujo."
      },
      {
        "name": "Trastorno bipolar",
        "aka": "Bipolar disorder",
        "costLow": 5000,
        "costHigh": 15000,
        "unit": "por año",
        "extra": "Medicación continua, terapia y a veces hospitalizaciones por crisis",
        "talkingPoint": "La estabilidad requiere tratamiento constante; el seguro la hace sostenible."
      },
      {
        "name": "Esquizofrenia",
        "aka": "Schizophrenia",
        "costLow": 10000,
        "costHigh": 30000,
        "unit": "por año",
        "extra": "Antipsicóticos inyectables de acción prolongada son costosos",
        "talkingPoint": "Un tratamiento continuo cubierto previene crisis y hospitalizaciones muy caras."
      },
      {
        "name": "Esclerosis múltiple",
        "aka": "Multiple sclerosis",
        "costLow": 70000,
        "costHigh": 120000,
        "unit": "por año",
        "extra": "Casi todas las terapias modificadoras (DMT) superan los $70,000/año a precio de lista",
        "talkingPoint": "Ningún tratamiento de MS baja de $70,000/año; sin seguro es simplemente inalcanzable."
      },
      {
        "name": "Enfermedad de Parkinson",
        "aka": "Parkinson's disease",
        "costLow": 10000,
        "costHigh": 30000,
        "unit": "por año",
        "extra": "La cirugía de estimulación cerebral profunda (DBS) añade decenas de miles",
        "talkingPoint": "El manejo continuo y la terapia son sostenibles solo con una buena cobertura."
      },
      {
        "name": "Epilepsia",
        "aka": "Epilepsy",
        "costLow": 5000,
        "costHigh": 20000,
        "unit": "por año",
        "extra": "Anticonvulsivos de marca y monitoreo; las crisis no controladas generan urgencias",
        "talkingPoint": "Controlar las crisis con seguro evita visitas de urgencia y hospitalizaciones caras."
      },
      {
        "name": "Enfermedad de Crohn / colitis ulcerosa (IBD)",
        "aka": "Crohn's disease / ulcerative colitis (IBD)",
        "costLow": 20000,
        "costHigh": 100000,
        "unit": "por año",
        "extra": "Los biológicos (Remicade, Humira, Stelara) son el mayor costo",
        "talkingPoint": "Los biológicos que controlan la enfermedad intestinal solo son viables con seguro."
      },
      {
        "name": "Lupus",
        "aka": "Lupus (SLE)",
        "costLow": 15000,
        "costHigh": 60000,
        "unit": "por año",
        "extra": "Biológicos como Benlysta y el daño a órganos elevan el gasto",
        "talkingPoint": "Una enfermedad impredecible de por vida: el seguro protege tu bolsillo en cada brote."
      },
      {
        "name": "Hepatitis C",
        "aka": "Hepatitis C (Harvoni / Mavyret)",
        "costLow": 24000,
        "costHigh": 95000,
        "unit": "tratamiento",
        "recovery": "8 a 12 semanas de tratamiento oral",
        "extra": "Harvoni ~$94,500 y Mavyret ~$39,600 por curso completo; es curativo",
        "talkingPoint": "Existe cura, pero cuesta hasta $95,000; con seguro es accesible y salvas tu hígado."
      },
      {
        "name": "Cirrosis",
        "aka": "Cirrhosis (liver)",
        "costLow": 15000,
        "costHigh": 50000,
        "unit": "por año",
        "extra": "Un trasplante de hígado supera los $800,000; el manejo evita llegar ahí",
        "talkingPoint": "Tratarla a tiempo con seguro evita un trasplante que cuesta cerca de un millón."
      },
      {
        "name": "Recuperación de ACV / derrame cerebral",
        "aka": "Stroke recovery / rehabilitation",
        "costLow": 20000,
        "costHigh": 90000,
        "unit": "por año",
        "recovery": "Meses a años de rehabilitación intensiva",
        "extra": "El primer año incluye hospitalización, rehabilitación y terapias",
        "talkingPoint": "La rehabilitación tras un derrame es larga y cara; el seguro sostiene tu recuperación."
      },
      {
        "name": "Obesidad",
        "aka": "Obesity",
        "costLow": 5000,
        "costHigh": 18000,
        "unit": "por año",
        "extra": "Fármacos GLP-1 (Wegovy, Zepbound) cuestan $12,000–$16,000/año solo el medicamento",
        "talkingPoint": "Los nuevos fármacos para adelgazar son carísimos sin cobertura; el seguro los hace posibles."
      },
      {
        "name": "Osteoporosis",
        "aka": "Osteoporosis",
        "costLow": 2000,
        "costHigh": 15000,
        "unit": "por año",
        "extra": "Inyectables como Prolia o Evenity elevan el costo; una fractura de cadera cuesta mucho más",
        "talkingPoint": "Prevenir fracturas con tratamiento cubierto evita cirugías de cadera de $40,000."
      },
      {
        "name": "Dolor crónico",
        "aka": "Chronic pain",
        "costLow": 5000,
        "costHigh": 20000,
        "unit": "por año",
        "extra": "Incluye medicación, fisioterapia, inyecciones y a veces procedimientos",
        "talkingPoint": "Un manejo integral del dolor con seguro te devuelve la funcionalidad sin arruinarte."
      },
      {
        "name": "Hipotiroidismo",
        "aka": "Hypothyroidism",
        "costLow": 500,
        "costHigh": 3000,
        "unit": "por año",
        "extra": "Levotiroxina genérica es muy barata; solo requiere control anual",
        "talkingPoint": "Barato de tratar, pero sin diagnóstico ni seguro las complicaciones salen caras."
      },
      {
        "name": "Psoriasis",
        "aka": "Psoriasis",
        "costLow": 10000,
        "costHigh": 80000,
        "unit": "por año",
        "extra": "Biológicos (Skyrizi, Cosentyx, Humira) para casos moderados-graves",
        "talkingPoint": "Los biológicos que limpian la piel cuestan una fortuna sin la cobertura adecuada."
      },
      {
        "name": "Migraña crónica",
        "aka": "Chronic migraine",
        "costLow": 5000,
        "costHigh": 20000,
        "unit": "por año",
        "extra": "Inyectables anti-CGRP (Aimovig, Emgality) y Botox trimestral",
        "talkingPoint": "Los tratamientos preventivos modernos solo son accesibles con un buen seguro."
      },
      {
        "name": "Fibromialgia",
        "aka": "Fibromyalgia",
        "costLow": 3000,
        "costHigh": 12000,
        "unit": "por año",
        "extra": "Medicación, fisioterapia y consultas frecuentes de manejo",
        "talkingPoint": "El manejo continuo con seguro mejora tu calidad de vida sin gastos que se acumulan."
      },
      {
        "name": "Apnea del sueño",
        "aka": "Sleep apnea",
        "costLow": 2000,
        "costHigh": 8000,
        "unit": "por año",
        "extra": "Estudio del sueño ($1,000–$3,000) más equipo CPAP e insumos",
        "talkingPoint": "Tratar la apnea con seguro previene infartos e hipertensión que salen mucho más caros."
      },
      {
        "name": "Gota",
        "aka": "Gout",
        "costLow": 1000,
        "costHigh": 6000,
        "unit": "por año",
        "extra": "Alopurinol genérico es barato; los ataques agudos generan visitas de urgencia",
        "talkingPoint": "Controlarla con genéricos cubiertos evita crisis dolorosas y visitas costosas."
      },
      {
        "name": "Hipertiroidismo / Enfermedad de Graves",
        "aka": "Hyperthyroidism / Graves' disease",
        "costLow": 2000,
        "costHigh": 10000,
        "unit": "por año",
        "extra": "Medicación, yodo radiactivo o cirugía de tiroides según el caso",
        "talkingPoint": "El tratamiento definitivo con seguro evita complicaciones cardíacas costosas."
      },
      {
        "name": "Dislipidemia / colesterol alto",
        "aka": "High cholesterol / dyslipidemia",
        "costLow": 500,
        "costHigh": 10000,
        "unit": "por año",
        "extra": "Estatinas genéricas muy baratas; los inhibidores PCSK9 (Repatha) superan los $6,000/año",
        "talkingPoint": "Controlar el colesterol con seguro previene el infarto que sí costaría una fortuna."
      }
    ]
  }
]

export const TOTAL_COST_ITEMS = HEALTH_COSTS.reduce((sum, c) => sum + c.items.length, 0)
