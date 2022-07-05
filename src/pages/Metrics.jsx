export const Metrics = () => {
  return (
    <>
      <div className="my-8 mb-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">
            ¿Qué es una métrica?
          </h2>
          <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
            Definición
          </p>
          <p className="mt-2">
            Las métricas son aquellos datos expresados numéricamente que nos
            sirven para analizar el rendimiento de una determinada campaña de
            marketing online. Digamos que, gracias a las métricas, podemos saber
            si estamos cumpliendo un objetivo. Y, en caso contrario, podremos
            rectificar en tiempo real, siempre que se realice un seguimiento
            periódico. Y es que la principal ventaja de marketing y la
            publicidad online sobre el offline es la capacidad de poder
            cuantificar de manera precisa y en tiempo real cada acción.
          </p>

          <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
            Métricas
          </h2>
          <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
            Métricas de Estimación
          </p>
          <p className="mt-2">
            Existen varias técnicas para medir el tamaño del Software, entre las
            cuales se encuentran:
          </p>
          <ul className="list-disc ml-8">
            <li>Medición de líneas de código fuente producidas (SLOC)</li>
            <li>Puntos de Función (FP)</li>
            <li>Puntos de Casos de Usos (UCP)</li>
            <li>Medición de líneas de código fuente producidas (SLOC)</li>
          </ul>

          <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
            Métricas
          </h2>
          <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
            Métricas de Lineas de Código
          </p>
          <p className="mt-2">
            Es una de las técnicas más conocidas pero requiere disponer del
            código lo que representa una restricción para realizar estimaciones
            tempranas, ya que la información que se tiene en esos momentos y el
            tiempo que se dispone para las primeras estimaciones del proyecto
            son generalmente escasos. De todos los puntos en los cuales puede
            realizarse la estimación, cuando menos datos se tienen para hacerla
            es en el momento inicial, cuando todavía se está evaluando la
            factibilidad del proyecto. Desde el punto de vista del desarrollo y
            venta de software específico para terceros esa estimación temprana,
            es una de las más importantes. Sin embargo, la actividad de
            estimación no se hace una sola vez en el proyecto, sino que a medida
            que se cuenta con más datos se hacen estimaciones más precisas que
            permiten una mejor planificación de lo que resta del proyecto. Luego
            con SLOC resultaría muy complejo realizar mediciones en horas
            tempranas de desarrollo del proyecto.
          </p>

          <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
            Métricas
          </h2>
          <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
            Puntos de Función (FP)
          </p>
          <p className="mt-2">
            El Análisis de Puntos Función (FPA) provee un enfoque alternativo
            pues permite estimar el tamaño del software basándose en los
            requerimientos, luego la cantidad de SLOC se puede estimar desde el
            tamaño en Puntos Función (FP). En etapas tempranas del ciclo de
            vida, se identifican los Actores y los Casos de Uso del sistema, y
            se documenta cada uno de ellos mediante una breve descripción.
            Aplicando el Análisis de Puntos de Función a estos Casos de Uso, se
            podrá obtener una estimación a groso modo del tamaño y a partir de
            ella del esfuerzo (Peralta 2004). Más adelante, cuando se tenga más
            información acerca del sistema se podrá refinar este análisis.
            Posteriormente se amplía la documentación de cada Caso de Uso,
            describiendo los Escenarios que se producen dentro del mismo. Un
            Escenario relata la secuencia de pasos que efectúan los actores y el
            sistema durante la ejecución del Caso de Uso. Si se aplica
            nuevamente el Análisis de Puntos de Función sobre estos Casos de Uso
            detallados, la estimación del tamaño y esfuerzo será más precisa que
            la anterior (Peralta 2004).
          </p>

          <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
            Métricas
          </h2>
          <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
            Puntos Función (PFA)
          </p>
          <p className="mt-2">
            Los FPA miden el tamaño del software cuantificando la funcionalidad
            provista al usuario basándose solamente en el diseño lógico y las
            especificaciones funcionales. Este método consiste (brevemente) en
            calcular los puntos de función teniendo en cuenta: - Entradas al
            sistema (entradas externas). - Salidas del sistema (salidas
            externas). - Consultas. - Grupos de datos lógicos del sistema. -
            Grupos de datos lógicos que no son del sistema pero que el sistema
            usa. Debe computarse cuántas ocurrencias de cada parámetro contiene
            un sistema, calificándolos según su complejidad en alta, media y
            baja. Cada parámetro para una complejidad dada tiene un determinado
            peso, ese peso son los puntos de función asignados a ese parámetro
            (CAO. 2006). Luego de realizado este proceso los puntos de función
            se ajustan a los requerimientos del sistema. La fórmula de Albretch
            (Albretch, 1979) para calcular los puntos función, es la siguiente:
            FP = UFP x TCF Donde UFP: Puntos Función no Ajustados y TCF: Factor
            de Complejidad Técnica. Los UFP son calculados mediante la sumatoria
            de los pesos de todos los parámetros identificados. Existen varias
            metodologías que estiman el tamaño del software utilizando este
            método como por ejemplo: - IFPUG-FPA (Function Point Analysis). -
            MKII (Mark II). - FFP (Full Function Point). - NESMA FPA
            (Netherlands Software Metrics Users Association Function Point
            Analysis). Este método también posee inconvenientes en su aplicación
            en etapas tempranas de desarrollo del software, debido a las causas
            previamente mencionadas de la escasez de información del sistema en
            esos momentos.
          </p>
        </div>
      </div>
    </>
  )
}
