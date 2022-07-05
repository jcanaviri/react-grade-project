export const ObjectPointsExplanation = ({ result }) => {
  return (
    <div className="p-4">
      <h4 className="font-semibold">¿Cómo y porque de los resultados?</h4>
      <p className="mt-2 text-sm">
        A continuación se detallan un detalles relacionados a como se realizo el
        proceso de estimación
      </p>
      <p className="mt-2 text-sm">
        Asi que mostraremos unas fórmulas explicativas:
      </p>
      <div className="my-4">
        <span className="bg-gray-200 p-2 block text-center italic rounded-md">
          NOP = OP (100 - %Reuso) / 100 <br />
          PM = NOP / PROD
        </span>
      </div>
      <p className="mt-2 text-sm">
        Aqui una breve explicación de lo expuesto en las fórmulas:
      </p>
      <p className="mt-2 text-sm">
        OP = puntos objeto <br />
        NOP = nuevos puntos objeto <br />
        PROD = productividad
      </p>

      <div className="my-4">
        <p className="text-sm">
          La productividad viene dada de la experiencia previamente seleccionada
          en el formulario previo
        </p>
      </div>

      <h4 className="font-semibold">¿Qué es una Persona Mes?</h4>
      <p className="mt-2 text-sm">
        Representa los meses de trabajo de una persona realizaria en el
        desarrollo del proyecto.
      </p>

      <h4 className="font-semibold border-t-2 pt-4 my-4 underline">
        Estimaciones Finales
      </h4>
      <p className="mt-2 mb-4 text-sm">
        <span className="font-semibold">
          Efuerzo(en Personas Mes) = {result.efforce}
        </span>
      </p>
      <p className="mt-2 mb-4 text-sm">
        <span className="font-semibold">
          Tiempo(en meses apróx.) = {result.time}
        </span>
      </p>
      <p className="mt-2 mb-4 text-sm">
        <span className="font-semibold">
          Costo(en {result.type_price} apróx.) = {result.aprox_cost}
        </span>
      </p>
    </div>
  )
}
