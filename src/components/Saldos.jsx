import Card from "./Card";
import CardContent from "./CardContent";

const Saldos = ({ gastos, participantes }) => {
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
  );
};
export default Saldos;
