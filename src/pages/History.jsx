import teacher from '../assets/teacher.svg'

export const History = () => {
  return (
    <>
      {/* Estimación section */}
      <div className="my-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">
              Un poco de Historia
            </h2>
            <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
              Definición
            </p>
            <p className="mt-4 text-gray-500">
              La <span className="italic font-bold">estimación</span> es una de
              las primeras y más importantes actividades de un proyecto.
              Consiste en predecir, en fases iniciales del ciclo de vida,
              características del software cuyo valor real sólo puede conocerse
              en etapas posteriores o cuando el proyecto ha finalizado.
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">
              Un poco de Historia
            </h2>
            <p className="mt-2 text-xl font-extrabold tracking-tight text-gray-900">
              Introducción
            </p>
            <p className="mt-4 text-gray-500">
              El primer componente de un proyecto de software es la
              planificación del proyecto. En esta etapa una de las tareas más
              importantes es la{' '}
              <span className="font-semibold">estimación</span>, tanto de
              recursos como de tiempo, costo y esfuerzo para el satisfactorio
              desarrollo del proyecto. Debido a la importancia de la estimación
              se han motivado múltiples investigaciones orientadas a mejorar la
              comprensión del proceso de desarrollo de software así como a
              construir y evaluar herramientas de estimación de costos del
              software. Estimar los factores relacionados con un proyecto
              (esfuerzo, personal, cronograma, costo, etc.) requiere conocer o
              estimar su tamaño para evaluar las posibles soluciones, comparar
              alternativas y calcular costos antes de decidir por un enfoque
              determinado <span className="italic">(Fillottrani 2007)</span>.
              Dentro del marco de un proyecto de Software pueden existir
              diversas variables a estimar, como pueden ser la estimación del
              tiempo de duración de cada una de las tareas a realizar dentro del
              proyecto (análisis, diseño, gestión, desarrollo, pruebas, entre
              otras) o del proyecto en total, así como las estimaciones de los
              casos de prueba por casos de uso, los riesgos, el esfuerzo a
              realizar, entre varios índices estimables.
            </p>
          </div>

          <div id="modelos" className="my-8 mb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">
                  Un poco de Historia
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Boehm y Humphrey sus puntos de vista
                </p>
              </div>

              <div className="sm:px-6 lg:px-8 grid grid-cols-1 gap-6 ">
                <div className="my-8">
                  <img className="w-1/2 h-full mx-auto" src={teacher} alt="teacher" />
                </div>
                <div>
                  <p className="mt-2 mx-8 text-base text-gray-500 mb-8">
                    Dos de las teorías con más reconocimiento internacional en
                    la estimación de proyectos de desarrollo de software son las
                    definidas por los investigadores Barry Bohem y Watt
                    Humphrey. Cada una de ellas se basa en técnicas
                    diametralmente opuestas pero muestran elementos mundialmente
                    acertados y aceptados por las empresas desarrolladoras de
                    software, que tienen en la calidad de sus productos y
                    servicios, su meta fundamental. El modelo original COCOMO se
                    publicó por primera vez en 1981 por Barry Boehm y reflejaba
                    las prácticas en el desarrollo de software de aquel momento.
                    Durante los años 80, el modelo se continuó perfeccionando y
                    consolidando, siendo actualmente el modelo de estimación de
                    costos más ampliamente utilizado en el mundo, es el
                    preferido para la estimación del esfuerzo cuando no se tiene
                    información histórica a la cual recurrir. Por su parte Watts
                    S. Humphrey fundó el Proceso de Software Personal (PSP)
                    ampliando el proceso de mejora a las personas que realizan
                    el trabajo de desarrollo de software, pues PSP se concentra
                    en las prácticas de trabajo de los ingenieros en una forma
                    individual, teniendo como principio servir para producir
                    software de calidad, basados en la utilización constante de
                    prácticas sanas de ingeniería de software. De la misma forma
                    que enseña a cómo planear y darle un seguimiento al trabajo,
                    utilizando un proceso bien definido y medido, estableciendo
                    metas mesurables, y finalmente utilizando el rastreo
                    constante para alcanzar dichas metas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"></dl>
          </div>
        </div>
      </div>
    </>
  )
}
