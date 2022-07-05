import learning from '../assets/learning.svg'
import support from '../assets/support.svg'

export const Models = () => {
  return (
    <>
      {/* Modelos de Estimación */}
      <div className="my-8 mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">
              Modelos
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Modelos de estimación existentes
            </p>
          </div>

          <div className="my-28 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <img className="w-full h-full" src={learning} alt="teacher" />
            </div>
            <div>
              <h2 className="text-lg mx-8 leading-6 font-medium text-gray-900">
                Modelos basados en la experiencia
              </h2>
              <p className="mt-2 mx-8 text-base text-gray-500 mb-8">
                Estos modelos se guian en la experiencia, tambien pueden ser
                conocidos como modelos de juicio experto, en el cual una persona
                o varias con más experiencia en desarrollo tiene la capacidad de
                mediante su criterio determinar los costes de un proyecto de
                software.
              </p>

              <h2 className="text-lg mx-8 leading-6 font-medium text-gray-900">
                Modelos basados en el calculo algorítmico
              </h2>
              <p className="mt-2 mx-8 text-base text-gray-500">
                Este tipo de modelos se realizan mediante la aplicación de
                fórmulas matemáticas y métodos ya establecidos, los cuales se
                ajustan a un determinado proyecto y mediante la aplicación de
                fórmulas se obtiene los resultados deseados.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modelos de Estimación */}

      {/* Modelos de Estimación */}
      <div className="my-8 mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="my-28 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg mx-8 leading-6 font-medium text-gray-900">
                Modelos basados en analogía
              </h2>
              <p className="mt-2 mx-8 text-base text-gray-500 mb-8">
                Consiste en comparar el desarrollo de software propuesto con
                proyectos previos similares. La ventaja sobre la estimación por
                juicio experto, es que la analogía se basa en experiencias que
                están documentadas, por lo cual esta se basa en números
                documentados. Una posible desventaja es que si existe mucha
                variación de las tecnologías y funcionalidades de un proyecto a
                otro será más difícil establecer estimaciones confiables.
              </p>

              <h2 className="text-lg mx-8 leading-6 font-medium text-gray-900">
                Estimación de software por descomposición
              </h2>
              <p className="mt-2 mx-8 text-base text-gray-500">
                Consiste en realizar una descomposición de proyecto en
                componentes, y estos a su vez en subcomponentes de mayor
                detalle. Este tipo de estimación parte del principio que dividir
                un problema en sus partes facilita su abordaje y análisis.
              </p>
            </div>
            <div>
              <img className="w-full h-full" src={support} alt="teacher" />
            </div>
          </div>
        </div>
      </div>
      {/* Modelos de Estimación */}
    </>
  )
}
