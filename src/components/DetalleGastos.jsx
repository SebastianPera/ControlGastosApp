import { useDispatch } from "react-redux";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import { eliminarGasto } from "@/slicesRedux/gastosSlice";

const DetalleGastos = ({ gastos }) => {
  const dispatch = useDispatch();
  const eliminarGastoHandler = (index) => {
    dispatch(eliminarGasto(index));
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="font-semibold">Detalle de Gastos</h2>
        <ul>
          {gastos.map(({ pagador, monto, compartidoCon, concepto }, i) => (
            <li key={i} className="border-y py-4">
              <strong>{pagador}</strong> pagó ${monto} por {concepto} y lo
              compartió con:{" "}
              {compartidoCon.filter((p) => p !== pagador).join(", ")}
              <button
                onClick={() => eliminarGastoHandler(i)}
                className="ml-4 font-bold text-lg"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DetalleGastos;
