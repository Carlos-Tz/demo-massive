import { Unit } from "./unit";

export interface Nota {
    presupuesto: boolean;
    nombre: string;
    nombre_s: string;
    refacciones: string;
    cant_num: number;
    cant_let: string;
    orden: number;
    fecha: string;
    domicilio: string;
    unidad: string;
    modelo: string;
    km: string;
    placas: string;
    serie: string;
    observ_r: string;
    observ: string;
    tel: string;
    antici: number;
    iva: boolean;
    tarjeta: boolean;
    efectivo: boolean;
    transferencia: boolean;
    firma1: string;
    firma2: string;
    firma3: string;
    firma4: string;
    firma1n: string;
    firma2n: string;
    firma3n: string;
    firma4n: string;
    units: Unit[];
}
