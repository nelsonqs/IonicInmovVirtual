import { Cuenta } from "./cuenta";

export class Aviso {
    
    id: string;
    titulo: string;
    descripcion: string;
    orden: number;
    estado: string;
    telefono: string;
    latitud: number;
    longitud: number;
    publicado: Number;
    precio: number;
    fecPublicacion: string;
    imagen: string;
    direccion: string;

    imei: string;

    cuenta: Cuenta;
    //subCategoria: SubCategoria;
    //tipoAviso: TipoAviso;
    //transaccionAviso: TransaccionAviso;

      constructor(descripcion: string, latitud: number, longitud: number) {
        this.descripcion = descripcion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecPublicacion = new Date().toLocaleString();
      }
}