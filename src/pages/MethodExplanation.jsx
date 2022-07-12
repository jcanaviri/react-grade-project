import { useParams, Link } from 'react-router-dom'

export const MethodExplanation = () => {
  const { type } = useParams()

  return (
    <>
      {type === 'PF' && (
        <div className="p-4 mb-16">
          <div className="p-4 border rounded-md">
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
              Puntos Función
            </h2>
            <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
              ¿Qué es el análisis de Puntos Función?
            </p>
            <p className="text-justify mb-2">
              El Análisis de{' '}
              <span className="italic font-semibold">Puntos Función (FPA)</span>{' '}
              provee un enfoque alternativo pues permite estimar el tamaño del
              software basándose en los requerimientos. En etapas tempranas del
              ciclo de vida, se identifican los Actores y los Casos de Uso del
              sistema, y se documenta cada uno de ellos mediante una breve
              descripción.
            </p>

            <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
              ¿Cómo se aplican los Puntos Función?
            </p>
            <p className="text-justify mb-2">
              Aplicando el Análisis de Puntos de Función a estos Casos de Uso,
              se podrá obtener una estimación a grosso modo del tamaño y a
              partir de ella del esfuerzo (Peralta 2004). Más adelante, cuando
              se tenga más información acerca del sistema se podrá refinar este
              análisis. Posteriormente se amplía la documentación de cada Caso
              de Uso, describiendo los escenarios que se producen dentro del
              mismo. Un Escenario relata la secuencia de pasos que efectúan los
              actores y el sistema durante la ejecución del Caso de Uso. Si se
              aplica nuevamente el Análisis de Puntos de Función sobre estos
              Casos de Uso detallados, la estimación del tamaño y esfuerzo será
              más precisa que la anterior (Peralta 2004).
            </p>

            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
              Modo de Uso
            </h2>
            <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
              ¿Cómo se realiza la estimación por Puntos Función?
            </p>
            <p className="text-justify mb-2">
              El FPA mide el tamaño del software cuantificando la funcionalidad
              provista al usuario basándose solamente en el diseño lógico y las
              especificaciones funcionales. Este método consiste (brevemente) en
              calcular los puntos de función teniendo en cuenta:
            </p>
            <ul className="list-disc mb-2 ml-8">
              <li>Entradas al sistema (entradas externas).</li>
              <li>Salidas del sistema (salidas externas).</li>
              <li>Consultas.</li>
              <li>Grupos de datos lógicos del sistema.</li>
              <li>
                Grupos de datos lógicos que no son del sistema pero que el
                sistema usa.
              </li>
            </ul>
            <p className="text-justify mb-2">
              Debe computarse cuántas ocurrencias de cada parámetro contiene un
              sistema, clasificándolos según su complejidad en alta, media y
              baja. Cada parámetro para una complejidad dada tiene un
              determinado peso, ese peso son los puntos de función asignados a
              ese parámetro (CAO. 2006). Luego de realizado este proceso los
              puntos de función se ajustan a los requerimientos del sistema.
            </p>
            <Link
              to="/dashboard"
              className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Volver al Dashboard
            </Link>
          </div>
        </div>
      )}
      {type === 'PO' && (
        <div className="p-4 mb-16">
          <div className="border p-4 rounded">
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
              Puntos Objeto
            </h2>
            <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
              ¿Qué son los Puntos Objeto?
            </p>
            <p className="text-justify mb-2">
              Los{' '}
              <span className="italic font-semibold">Puntos Objetos (OP)</span>{' '}
              son una métrica del software el cual se basa en dividir el sistema
              número de objetos que este posee. Aquí podría existir una
              confusión ya que se usa la palabra{' '}
              <span className="italic font-semibold">objeto</span> y se podría
              pensar que se refiere o esta relacionado a la Programación
              Orientada a Objetos y no es así, ya que a lo que se refiere es a
              la cantidad de pantallas y vistas que posee el sistema.
            </p>

            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase mt-4">
              Modo de Uso
            </h2>
            <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
              Cómo estimar un proyecto mediante este método?
            </p>

            <p className="mt-2 text-sm">
              El proceso de estimación consiste en el conteo de pantallas,
              reportes que el sistema posee, después de esto se calcula la
              productividad
            </p>
            <div className="my-4">
              <span className="bg-gray-200 p-2 block text-center italic rounded-md">
                NOP = OP (100 - %Reuso) / 100 <br />
                PM = NOP / PROD <br />
                PROD = % experiencia
              </span>
            </div>
            <p className="mt-2 text-sm">
              Aqui una breve explicación de lo expuesto en las fórmulas:
            </p>
            <p className="mt-2 text-sm">
              OP = puntos objeto <br />
              NOP = nuevos puntos objeto <br />
              PROD = productividad PM = persona mes
            </p>

            <div className="my-4">
              <p className="text-sm">
                La experiencia en un valor porcentual el cual se pedirá en el
                proceso de estimación.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Volver al Dashboard
            </Link>
          </div>
        </div>
      )}
      {type === 'PH' && <>¿Qué es el análisis de Puntos Historia?</>}
    </>
  )
}
