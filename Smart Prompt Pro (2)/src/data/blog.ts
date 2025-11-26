/**
 * Fuente de datos del Blog: posts, categorías y utilidades
 * Contiene el artículo destacado y el resto de artículos con slug y contenido completo
 */

export interface BlogPost {
  /** Identificador legible en URL */
  slug: string
  /** Título del artículo */
  title: string
  /** Resumen breve para listados */
  excerpt: string
  /** Contenido completo dividido por párrafos */
  content: string[]
  /** Categoría de alto nivel (Caso de Éxito, Técnico, Metodología, etc.) */
  category: string
  /** Sector implicado (Legal, Marketing, Salud, ...) */
  sector: string
  /** Tiempo de lectura estimado */
  readTime: string
  /** Fecha de publicación (texto) */
  date: string
  /** Autor/a principal */
  author: string
  /** Imagen principal del artículo */
  image: string
  /** Indicador de destacado */
  featured?: boolean
}

/** Listas auxiliares para filtros */
export const categories: string[] = ['Todos', 'Caso de Éxito', 'Técnico', 'Metodología']
export const sectors: string[] = ['Todos', 'Legal', 'Marketing', 'Salud', 'Finanzas', 'Educación', 'Ingeniería']

/** Artículo destacado */
export const featuredPost: BlogPost = {
  slug: 'bufete-legal-redujo-80-tiempo-de-contratos',
  title: 'Cómo un Bufete Legal Redujo 80% el Tiempo de Redacción de Contratos',
  excerpt:
    'Caso de estudio completo: Martínez & Asociados implementó nuestro GPT legal personalizado y transformó completamente sus procesos de documentación jurídica.',
  content: [
    'Martínez & Asociados enfrentaba un cuello de botella en la redacción y revisión de contratos comerciales. Las revisiones internas consumían horas y carecían de estandarización.',
    'Implementamos un GPT legal especializado ajustado con guías internas, plantillas y jurisprudencia clave. El sistema sugiere cláusulas, detecta ambigüedades y propone referencias.',
    'El flujo de trabajo incluye: 1) intake del caso y tipo de contrato, 2) propuesta inicial generada por el GPT, 3) validación legal y ajustes, 4) versión final y registro.',
    'Resultados: 80% menos tiempo en redacción, 65% mejora en precisión de citas y un ahorro anual estimado de $150K en horas de investigación.',
    'Lecciones: el éxito radica en combinar datos internos curados, plantillas de calidad y una guía de estilo jurídica clara.',
  ],
  category: 'Caso de Éxito',
  sector: 'Legal',
  readTime: '8 min',
  date: '15 Dic 2024',
  author: 'Andrés Martín',
  image:
    'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/1fda9db1-90b9-4232-ba26-3ef67d4f0a81.jpg',
  featured: true,
}

/** Resto de artículos del blog (incluye algunos destacados del grid) */
export const blogPosts: BlogPost[] = [
  {
    slug: 'prompt-engineering-7-tecnicas-avanzadas-precision',
    title: 'Prompt Engineering: 7 Técnicas Avanzadas para Maximizar Precisión',
    excerpt:
      'Descubre las técnicas propietarias que utilizamos para crear prompts que superan el 95% de precisión en terminología especializada.',
    content: [
      'La precisión en prompts especializados depende de estructura, contexto y restricciones. Las siete técnicas clave incluyen: desambiguación guiada, verificación paso a paso y roles expertos.',
      'Usamos plantillas por dominio con ejemplos positivos/negativos y glosarios controlados. Esto reduce variabilidad y mejora consistencia.',
      'La incorporación de criterios de evaluación hace que el propio modelo señale incoherencias antes de entregar.',
      'Iterar con feedback del usuario final es esencial para lograr terminología y estilo aceptados.',
    ],
    category: 'Técnico',
    sector: 'Todos',
    readTime: '12 min',
    date: '10 Dic 2024',
    author: 'Dra. Elena Rodríguez',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/6d169c6e-e92b-433f-b3fc-311bfaccd4a6.jpg',
  },
  {
    slug: 'roi-real-agencia-marketing-triplica-productividad',
    title: 'ROI Real: Marketing Agency Triplica Productividad con GPT Personalizado',
    excerpt:
      'CreativeFlow transformó su operación: de 8 horas por campaña a 2.5 horas, manteniendo calidad premium y consistencia de marca.',
    content: [
      'El reto principal era producir piezas multi-canal con voz de marca consistente. Se definió una guía de estilo robusta y prompts por canal.',
      'El GPT genera borradores con estructura óptima por plataforma y etiqueta sugerencias A/B para pruebas rápidas.',
      'La productividad se triplicó y el tiempo de revisión disminuyó 70%. La satisfacción de clientes también mejoró.',
    ],
    category: 'Caso de Éxito',
    sector: 'Marketing',
    readTime: '6 min',
    date: '8 Dic 2024',
    author: 'Laura Chen',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/8746a6b4-2e03-4ea6-b3fc-4bd79a96e1b7.jpg',
    featured: true,
  },
  {
    slug: 'ia-salud-personalizar-gpts-informes-medicos-precisos',
    title: 'IA en Salud: Cómo Personalizar GPTs para Informes Médicos Precisos',
    excerpt:
      'Guía técnica sobre adaptación de modelos de lenguaje para terminología médica, cumplimiento HIPAA y protocolos clínicos.',
    content: [
      'Los informes médicos demandan precisión y cumplimiento. Se requiere diccionarios clínicos y plantillas por especialidad.',
      'La privacidad es central: se aplican políticas de anonimización y acceso restringido.',
      'Los mejores resultados se logran con ejemplos reales aprobados por el comité médico.',
    ],
    category: 'Técnico',
    sector: 'Salud',
    readTime: '10 min',
    date: '5 Dic 2024',
    author: 'Dr. Carlos Mendoza',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/e7da8293-3346-4b17-9a12-0d665117f009.jpg',
  },
  {
    slug: 'fintech-automatizacion-analisis-crediticio-ia',
    title: 'Fintech Revolution: Automatización de Análisis Crediticio con IA',
    excerpt:
      'Corporación Financiera Andina redujo tiempo de análisis de riesgo de 4 horas a 15 minutos con 99.2% de precisión.',
    content: [
      'Se integró el GPT con fuentes de datos internas y externas para pre-análisis y banderas de riesgo.',
      'El sistema sugiere argumentos y evidencia para decisiones, dejando trazabilidad de cada recomendación.',
      'El resultado: tiempos drásticamente menores y precisión superior al estándar histórico.',
    ],
    category: 'Caso de Éxito',
    sector: 'Finanzas',
    readTime: '9 min',
    date: '2 Dic 2024',
    author: 'Andrés Martín',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/357d3ae0-73fd-4d39-ab37-ad1fc04f8367.jpg',
    featured: true,
  },
  {
    slug: 'educacion-gpts-material-didactico-personalizado',
    title: 'Educación 4.0: GPTs que Generan Material Didáctico Personalizado',
    excerpt:
      'Instituto Tecnológico Futuro implementó IA para crear contenido educativo adaptivo, mejorando engagement estudiantil 75%.',
    content: [
      'La plataforma genera material según nivel y estilo de aprendizaje, con rúbricas por competencias.',
      'Docentes conservan control editorial y validan entregables antes de publicar.',
      'El engagement y las tasas de aprobación subieron de forma sostenida.',
    ],
    category: 'Caso de Éxito',
    sector: 'Educación',
    readTime: '7 min',
    date: '28 Nov 2024',
    author: 'Laura Chen',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/f2aa97b2-b7bb-4f03-9315-8c3ae914cdb9.jpg',
  },
  {
    slug: 'ingenieria-predictiva-optimiza-proyectos-constructivos',
    title: 'Ingeniería Predictiva: IA para Optimización de Proyectos Constructivos',
    excerpt:
      'Constructora Ingeniería Avanzada utiliza GPTs para análisis predictivo, reduciendo costos 30% y acelerando entregas 25%.',
    content: [
      'Se combinaron modelos de lenguaje con series temporales para proyecciones realistas.',
      'La IA propone acciones preventivas ante retrasos y sobrecostos comunes.',
      'La adopción incluyó capacitación y tableros de seguimiento accesibles para obra y PMO.',
    ],
    category: 'Caso de Éxito',
    sector: 'Ingeniería',
    readTime: '11 min',
    date: '25 Nov 2024',
    author: 'Dr. Carlos Mendoza',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/b1957ead-4b84-4b25-9759-eda62876c224.jpg',
  },
  {
    slug: 'metodologia-smartprompt-de-evaluacion-a-implementacion',
    title: 'Metodología SmartPrompt: De la Evaluación a la Implementación',
    excerpt:
      'Análisis detallado de nuestro proceso de 5 fases para implementar GPTs personalizados con garantía de éxito.',
    content: [
      'Nuestra metodología abarca: evaluación, diseño, ajuste, integración y mejora continua.',
      'Cada fase tiene entregables claros, métricas y responsables definidos.',
      'La transparencia del proceso facilita la adopción y acelera el time-to-value.',
    ],
    category: 'Metodología',
    sector: 'Todos',
    readTime: '15 min',
    date: '20 Nov 2024',
    author: 'Andrés Martín',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/ec42b1a2-5a38-4cbd-a5ec-363d02c0df7b.jpg',
  },
  {
    slug: 'seguridad-y-compliance-en-gpts-empresariales',
    title: 'Seguridad y Compliance en GPTs Empresariales',
    excerpt:
      'Guía completa sobre implementación segura de IA personalizada: encriptación, auditoría y cumplimiento normativo.',
    content: [
      'El diseño seguro incluye separación de datos, cifrado en tránsito/repouso y control de acceso granular.',
      'El registro de auditoría permite trazabilidad de prompts/respuestas para investigación y mejora.',
      'El cumplimiento requiere políticas claras, revisión legal y capacitación continua.',
    ],
    category: 'Técnico',
    sector: 'Todos',
    readTime: '13 min',
    date: '18 Nov 2024',
    author: 'Dra. Elena Rodríguez',
    image:
      'https://pub-cdn.sider.ai/u/U04XH6E0RRN/web-coder/68902b460cd2d7c5a266e6a1/resource/14226f1c-55e5-41e7-87cf-636992468ef7.jpg',
  },
]

/** Todos los artículos incluidos el destacado para búsquedas rápidas */
export const allPosts: BlogPost[] = [featuredPost, ...blogPosts]

/**
 * Obtiene un post por slug
 * @param slug slug del artículo
 * @returns BlogPost o undefined si no existe
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug)
}
