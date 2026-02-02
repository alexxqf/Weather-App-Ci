const { 
  obtenerDatosMeteo,
  interpretarCodigoTiempo,
  interpretarDireccionViento,
  formatearDatosMeteo,
} = require("./weatherService");

// --- Tests de interpretarCodigoTiempo ---
describe("interpretarCodigoTiempo", () => {
    test("debe retornar descripción y emoji correctos para código 0 (despejado)", () => {
        const resultado = interpretarCodigoTiempo(0);
        expect(resultado.descripcion).toBe("Despejado");
        expect(resultado.emoji).toBe("☀️");
    });

    test("debe retornar descripción y emoji correctos para código 61 (lluvia)", () => {
        const resultado = interpretarCodigoTiempo(61);
        expect(resultado.descripcion).toBe("Lluvia");
        expect(resultado.emoji).toBe("🌧️");
    });

    test("debe manejar códigos desconocidos", () => {
        const resultado = interpretarCodigoTiempo(999); // Un código que no existe
        expect(resultado.descripcion).toBe("Desconocido");
        expect(resultado.emoji).toBe("❓");
    });
});

// --- Tests de interpretarDireccionViento ---
describe("interpretarDireccionViento", () => {
    test("debe retornar (N) para 0 grados", () => {
        const resultado = interpretarDireccionViento(0);
        expect(resultado.direccion).toBe("N");
    });

    test("debe retornar (E) para 90 grados", () => {
        const resultado = interpretarDireccionViento(90);
        expect(resultado.direccion).toBe("E");
    });

    test("debe retornar (S) para 180 grados", () => {
        const resultado = interpretarDireccionViento(180);
        expect(resultado.direccion).toBe("S");
    });

    test("debe retornar (W) para 270 grados", () => {
        const resultado = interpretarDireccionViento(270);
        expect(resultado.direccion).toBe("W");
    });

    test("debe manejar grados mayores a 360 (normalización)", () => {
        const resultado = interpretarDireccionViento(450); // 450 - 360 = 90 (E)
        expect(resultado.direccion).toBe("E");
    });
});

// --- Tests de obtenerDatosMeteo (MOCK de FETCH) ---
describe("obtenerDatosMeteo", () => {
    // Simulamos la respuesta de la API para no depender de internet
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    test("debe obtener datos correctamente de la API", async () => {
        const mockResponse = {
            ok: true,
            json: () => Promise.resolve({ current: { temp: 20 } }),
        };
        global.fetch.mockResolvedValue(mockResponse);

        const datos = await obtenerDatosMeteo(43.28, -2.16);
        expect(datos.current.temp).toBe(20);
        expect(global.fetch).toHaveBeenCalled();
    });

    test("debe lanzar un error si la respuesta no es ok", async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
            statusText: "Not Found"
        });

        await expect(obtenerDatosMeteo(0, 0)).rejects.toThrow("Error en la petición: 404 Not Found");
    });

    test("debe lanzar un error si el fetch falla (error de red)", async () => {
        global.fetch.mockRejectedValue(new Error("Network Error"));

        await expect(obtenerDatosMeteo(0, 0)).rejects.toThrow("Fallo al obtener datos meteorológicos: Network Error");
    });
});

// --- Tests de formatearDatosMeteo ---
describe("formatearDatosMeteo", () => {
  const datosMock = {
    current: {
      temperature_2m: 18.5,
      relative_humidity_2m: 72,
      apparent_temperature: 17.2,
      precipitation_probability: 15,
      precipitation: 0.0,
      weather_code: 2,
      wind_speed_10m: 12.5,
      wind_direction_10m: 310,
    },
    current_units: {
      temperature_2m: "°C",
      relative_humidity_2m: "%",
      apparent_temperature: "°C",
      precipitation_probability: "%",
      precipitation: "mm",
      wind_speed_10m: "km/h",
      wind_direction_10m: "°",
    }
  };

  test("debe incluir todos los datos clave en el string", () => {
    const resultado = formatearDatosMeteo(datosMock, 42.23, -8.72);
    expect(resultado).toContain("42.23°N");
    expect(resultado).toContain("18.5");
    expect(resultado).toContain("Parcialmente nublado");
    expect(resultado).toContain("NW");
  });
});