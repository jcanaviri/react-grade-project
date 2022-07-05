export const FunctionPointsExplanation = ({ result }) => {
  let isbsgFirstTime =
    Math.round(0.8 * result.efforce.split(' ')[0] ** 0.404 * 100) / 100
  let isbsgSecondTime =
    Math.round(0.3 * result.efforce.split(' ')[0] ** 0.559 * 100) / 100
  let isbsgThirdTime =
    Math.round(1.11 * result.efforce.split(' ')[0] ** 0.32 * 100) / 100

  return (
    <div className="p-4">
      {/* Explanation */}
      <h4 className="font-semibold">¿Cómo y porque de los resultados?</h4>
      <p className="mt-2 text-sm">
        Bueno llegado a este punto podemos encontrar el resultado en Puntos
        Función, ya ajustados con los factores de ajustes previos.
      </p>
      <p className="mt-2 text-sm">
        Pero previamente presentamos las fórmulas más relevantes las cuales son
        las siguentes:
      </p>
      <div className="my-4">
        <span className="bg-gray-200 p-2 block text-center italic rounded-md">
          PF = CuentaTotal * [0.65 + 0.01 * &Sigma; Factores de Ajuste ]
        </span>
      </div>
      <p className="mt-2 text-sm">
        Como se puede ver los puntos funcion salen de esta fórmula. Los puntos
        funcion son una métrica orientada a la funcionalidad.
      </p>
      <p className="mt-2 text-sm">
        Ahora bien en el caso del tiempo contamos con una gran variedad de
        fórmulas y las pasamos a listar
        <span className="font-extralight italic block">Carpers Jones:</span>
        <span className="bg-gray-200 p-2 block text-center italic rounded-md">
          T = (Tamaño en PF)^0.404
        </span>
        <span className="font-extralight italic block">
          ISBSG(Internation Software Benchmarking Group)
        </span>
        <span className="bg-gray-200 p-2 block text-center italic rounded-md">
          T = 0,80 (Tamaño en PF) ^0.404 <br />
          T = 0.3 (Tamaño en PF) ^ 0,559 3GL <br />T = 1.11 (Tamaño) ^ 0.32 4GL
        </span>
      </p>

      {/* Results */}
      <h4 className="font-semibold mt-4 pt-4 border-t-2 underline">
        Resultados Finales de tu Estimación
      </h4>
      <div className="my-4">
        <p>
          <span className="font-semibold">Resultado (PF) =</span>{' '}
          {result.efforce}
        </p>
      </div>
      <div className="my-4">
        <p>
          <span className="font-semibold">Tiempo (meses apróx.) =</span>{' '}
          {result.time} Según Carpers Jones
        </p>
      </div>
      <div className="my-4">
        <p>
          <span className="font-semibold">Tiempo (meses apróx.) =</span>{' '}
          {isbsgFirstTime} Según ISBSG
        </p>
      </div>
      <div className="my-4">
        <p>
          <span className="font-semibold">Tiempo (meses apróx.) =</span>{' '}
          {isbsgSecondTime} Según ISBSG 3GL
        </p>
      </div>

      <div className="my-4">
        <p>
          <span className="font-semibold">Tiempo (meses apróx.) =</span>{' '}
          {isbsgThirdTime} Según ISBSG 4GL
        </p>
      </div>

      <h4 className="font-semibold mt-4 pt-4 border-t-2 underline">
        Cálculo de Costos
      </h4>

      <div className="my-4">
        <span className="block mb-2">
          Cuando registraste tu proyecto se te pidieron los siguientes datos:
        </span>
        <ul className="list-disc ml-4">
          <li>
            <span className="font-semibold">{result.project.team_number} </span>
            personas en el Team
          </li>
          <li>
            <span className="font-semibold">
              {result.project.aprox_salary} {result.type_price}{' '}
            </span>
            salario aproximado por miembro del equipo
          </li>
          <li>
            <span className="font-semibold"> {result.type_price} </span> tipo de
            cambio
          </li>
        </ul>
        <span className="block my-2">
          Asi que a partir de estos datos el costo aprox sera calculado, ademas
          que se considera los posibles tiempos previamente calculados:
        </span>
      </div>

      <div className="my-4">
        <p>
          <span className="font-semibold">
            Costo (en {result.type_price}) =
          </span>{' '}
          {result.aprox_cost} Según Carpers Jones
        </p>
      </div>
      <div className="my-4">
        <p>
          <span className="font-semibold">
            Costo (en {result.type_price}) ={' '}
          </span>{' '}
          {(isbsgFirstTime *
            result.project.team_number *
            result.project.aprox_salary).toFixed(2)}{' '}
          costo Según ISBSG
        </p>
      </div>
      <div className="my-4">
        <p>
          <span className="font-semibold">
            Costo (en {result.type_price}) =
          </span>{' '}
          {(isbsgSecondTime *
            result.project.team_number *
            result.project.aprox_salary).toFixed(2)}{' '}
          Consto Según ISBSG 3GL
        </p>
      </div>

      <div className="my-4">
        <p>
          <span className="font-semibold">
            Costo (en {result.type_price}) =
          </span>{' '}
          {(isbsgThirdTime *
            result.project.team_number *
            result.project.aprox_salary).toFixed(2)}{' '}
          costo Según ISBSG 4GL
        </p>
      </div>
    </div>
  )
}
