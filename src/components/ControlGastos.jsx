import { useSelector } from "react-redux";
import DetalleGastos from "@/components/DetalleGastos";
import AgregarGasto from "./AgregarGasto";
import AgregarPersona from "./AgregarPersona";
import Saldos from "./Saldos";

export default function ControlGastos() {
  const { participantes, gastos } = useSelector((state) => state.gastos);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gastos Compartidos</h1>
      <AgregarPersona participantes={participantes} />
      <AgregarGasto participantes={participantes} />
      <DetalleGastos gastos={gastos} />
      <Saldos gastos={gastos} participantes={participantes} />
    </div>
  );
}
