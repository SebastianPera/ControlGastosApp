import Card from "@/components/Card";
import CardContent from "@/components/CardContent";
import { Button } from "@/components/button";
import { CheckboxParticipante } from "@/components/CheckboxParticipante";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { agregarGasto } from "../slicesRedux/gastosSlice";

const AgregarGasto = ({ participantes }) => {
  const dispatch = useDispatch();

  const [nuevoGasto, setNuevoGasto] = useState({
    pagador: "",
    monto: "",
    compartidoCon: [],
    concepto: "",
  });

  const handlePagadorChange = (e) => {
    const selectedPagador = e.target.value;
    setNuevoGasto((prevState) => ({
      ...prevState,
      pagador: selectedPagador,
      compartidoCon: selectedPagador
        ? [...prevState.compartidoCon, selectedPagador]
        : [],
    }));
  };

  const agregarGastoHandler = () => {
    if (
      nuevoGasto.pagador &&
      nuevoGasto.monto > 0 &&
      nuevoGasto.compartidoCon.length &&
      nuevoGasto.concepto
    ) {
      dispatch(agregarGasto(nuevoGasto));
      setNuevoGasto({
        pagador: "",
        monto: "",
        compartidoCon: [],
        concepto: "",
      });
    }
  };

  const handleCheckboxChange = (e, participante) => {
    const { checked } = e.target;
    setNuevoGasto((prevState) => ({
      ...prevState,
      compartidoCon: checked
        ? [...prevState.compartidoCon, participante]
        : prevState.compartidoCon.filter((p) => p !== participante),
    }));
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <h2 className="font-semibold">Agregar Gasto</h2>

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

        <input
          type="number"
          placeholder="Monto"
          value={nuevoGasto.monto}
          onChange={(e) =>
            setNuevoGasto({
              ...nuevoGasto,
              monto: parseFloat(e.target.value) || 0,
            })
          }
          className="border p-1 mr-2"
          min="0"
          step="0.01"
        />

        <input
          type="text"
          placeholder="Concepto"
          value={nuevoGasto.concepto}
          className="border p-1 mr-2"
          onChange={(e) =>
            setNuevoGasto({ ...nuevoGasto, concepto: e.target.value })
          }
        />

        <div className="mt-2">
          <h3 className="font-semibold">Compartido con:</h3>
          {participantes.map((p, i) => (
            <CheckboxParticipante
              key={i}
              participante={p}
              checked={nuevoGasto.compartidoCon.includes(p)}
              onChange={(e) => handleCheckboxChange(e, p)}
              disabled={p === nuevoGasto.pagador}
            />
          ))}
        </div>

        <Button onClick={agregarGastoHandler} className="mt-2">
          Agregar Gasto
        </Button>
      </CardContent>
    </Card>
  );
};
export default AgregarGasto;
