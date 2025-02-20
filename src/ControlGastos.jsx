import { useEffect, useState } from "react";
import { Card } from "@/card";
import { CardContent } from "@/cardContent";
import { Button } from "@/button";
import { CheckboxParticipante } from "./CheckboxParticipante";

export default function ControlGastos() {
  const [participantes, setParticipantes] = useState(
    JSON.parse(localStorage.getItem("participantes") || "[]")
  );
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos") || "[]")
  );
  const [nuevoParticipante, setNuevoParticipante] = useState("");
  const [nuevoGasto, setNuevoGasto] = useState({
    pagador: "",
    monto: "",
    compartidoCon: [],
    concepto: "",
  });

  useEffect(() => {
    if (participantes.length > 0) {
      localStorage.setItem("participantes", JSON.stringify(participantes));
    }
    if (gastos.length > 0) {
      localStorage.setItem("gastos", JSON.stringify(gastos));
    }
  }, [participantes, gastos]);

  const agregarParticipante = () => {
    if (
      nuevoParticipante.trim() &&
      !participantes.includes(nuevoParticipante)
    ) {
      setParticipantes([...participantes, nuevoParticipante]);
      setNuevoParticipante("");
    } else if (participantes.includes(nuevoParticipante)) {
      alert("El participante ya está en la lista");
    }
  };

  const agregarGasto = () => {
    if (
      nuevoGasto.pagador &&
      nuevoGasto.monto > 0 &&
      nuevoGasto.compartidoCon.length &&
      nuevoGasto.concepto
    ) {
      setGastos([...gastos, nuevoGasto]);
      setNuevoGasto({
        pagador: "",
        monto: "",
        compartidoCon: [],
        concepto: "",
      });
    }
  };

  const calcularSaldos = () => {
    const saldos = Object.fromEntries(participantes.map((p) => [p, 0]));
    gastos.forEach(({ pagador, monto, compartidoCon }) => {
      const montoDividido = monto / compartidoCon.length;
      compartidoCon.forEach((persona) => {
        if (persona !== pagador) {
          saldos[persona] -= montoDividido;
          saldos[pagador] += montoDividido;
        }
      });
    });
    return saldos;
  };

  const handleCheckboxChange = (e, participante) => {
    const { checked } = e.target;
    console.log(e);

    setNuevoGasto((prevState) => {
      const updatedCompartidoCon = checked
        ? [...prevState.compartidoCon, participante]
        : prevState.compartidoCon.filter((p) => p !== participante);

      return { ...prevState, compartidoCon: updatedCompartidoCon };
    });
  };

  const handlePagadorChange = (e) => {
    const selectedPagador = e.target.value;
    setNuevoGasto((prevState) => {
      // Aseguramos que el pagador siempre esté en la lista de "compartido con"
      const updatedCompartidoCon = selectedPagador
        ? [...prevState.compartidoCon, selectedPagador]
        : [];
      return {
        ...prevState,
        pagador: selectedPagador,
        compartidoCon: updatedCompartidoCon,
      };
    });
  };

  /* Eliminar Gasto */
  const eliminarGasto = (index) => {
    setGastos(gastos.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gastos Compartidos</h1>

      {/* Participantes */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="font-semibold">Participantes</h2>
          <div className="flex gap-2 my-2">
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoParticipante}
              onChange={(e) => setNuevoParticipante(e.target.value)}
              className="border p-1"
            />
            <Button onClick={agregarParticipante}>Agregar</Button>
          </div>
          <ul>
            {participantes.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Agregar Gasto */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="font-semibold">Agregar Gasto</h2>

          {/* Selección de quien pagó */}
          <select
            value={nuevoGasto.pagador}
            onChange={handlePagadorChange}
            className="border p-1 mr-2"
          >
            <option value="">Seleccione quién pagó</option>
            {participantes.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Monto */}
          <input
            type="number"
            placeholder="Monto"
            value={nuevoGasto.monto}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setNuevoGasto({ ...nuevoGasto, monto: isNaN(value) ? 0 : value });
            }}
            className="border p-1 mr-2"
            min="0"
            step="0.01"
          />

          {/* Concepto del gasto */}
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            placeholder="Por ejemplo, Comida"
            value={nuevoGasto.concepto}
            className="border p-1 mr-2 ml-3"
            onChange={(e) =>
              setNuevoGasto({ ...nuevoGasto, concepto: e.target.value })
            }
          />

          {/* Compartido con */}
          <div className="mt-2">
            <h3 className="font-semibold">Compartido con:</h3>
            {participantes.map((p, i) => (
              <CheckboxParticipante
                key={i}
                participante={p}
                checked={nuevoGasto.compartidoCon.includes(p)}
                onChange={(e) => handleCheckboxChange(e, p)}
                disabled={p === nuevoGasto.pagador} // Deshabilitar checkbox si es el pagador
              />
            ))}
          </div>

          <Button onClick={agregarGasto}>Agregar</Button>
        </CardContent>
      </Card>

      {/* Detalle Gastos */}
      <Card className="mb-4">
        <CardContent>
          <h2 className="font-semibold">Detalle de Gastos</h2>
          <ul>
            {gastos.map(({ pagador, monto, compartidoCon, concepto }, i) => (
              <li key={i} className="border-y py-4">
                <strong>{pagador}</strong> pagó ${monto} por {concepto} y lo
                compartió con:{" "}
                {compartidoCon
                  .filter((participante) => participante !== pagador)
                  .join(", ")}
                <button
                  onClick={() => eliminarGasto(i)}
                  className="ml-4 font-bold text-lg"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

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
