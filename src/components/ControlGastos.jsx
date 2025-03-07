import { useSelector } from "react-redux";
import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import DetalleGastos from "@/components/DetalleGastos";
import AgregarGasto from "./AgregarGasto";
import AgregarPersona from "./AgregarPersona";

export default function ControlGastos() {
  const { participantes, gastos } = useSelector((state) => state.gastos);

  const calcularSaldos = () => {
    const saldos = Object.fromEntries(participantes.map((p) => [p, 0]));
    gastos.forEach(({ pagador, monto, compartidoCon }) => {
      const montoDividido = monto / compartidoCon.length;
      console.log(montoDividido);

      compartidoCon.forEach((persona) => {
        if (persona !== pagador) {
          saldos[persona] -= montoDividido;
          saldos[pagador] += montoDividido;
        }
      });
    });
    return saldos;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gastos Compartidos</h1>
      <AgregarPersona participantes={participantes} />

      <AgregarGasto participantes={participantes} />

      <DetalleGastos gastos={gastos} />

      {/* Saldos */}
      <Card>
        <CardContent>
          <h2 className="font-semibold">Saldos</h2>
          <ul>
            {Object.entries(calcularSaldos()).map(([persona, saldo]) => (
              <li key={persona}>
                {persona}: {saldo.toFixed(2)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
