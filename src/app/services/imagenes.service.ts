import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { ImagenesModel } from '../models/imagenes.model';
import { FileItems } from '../models/file.items';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private CARPETA_IMAGENES = 'img';
  private imagenesCollection: AngularFirestoreCollection<ImagenesModel>;

  progress: any;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.imagenesCollection = db.collection<ImagenesModel>('rostros');
  }

  getImagenes() {
    return this.imagenesCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<ImagenesModel>[]) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as ImagenesModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getImagen(id: any) {
    return this.imagenesCollection.doc(id).valueChanges();
  }

  cargarImagenesFirebase(imagen: FileItems, imagesData: ImagenesModel) {
    const item = imagen;
    const imagenTrim = imagesData.nombreImagen;
    const storageRef = this.storage.ref(`${this.CARPETA_IMAGENES}/${imagenTrim.replace(/ /g, '')}`);

    const uploadTask = this.storage.upload(`${this.CARPETA_IMAGENES}/${imagenTrim.replace(/ /g, '')}`, item.archivo);

    uploadTask.snapshotChanges().pipe(
      map((snapshot) => (snapshot?.state === 'success' ? snapshot : null))
    ).subscribe(
      (snapshot) => {
        if (snapshot) {
          this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(this.progress);
        }
      },
      (err) => {
        console.log('Error al subir archivo', err);
      },
      () => {
        this.storage.ref(`${this.CARPETA_IMAGENES}/${imagenTrim.replace(/ /g, '')}`).getDownloadURL().subscribe((downloadURL) => {
          item.url = downloadURL;
          this.guardarImagen({
            nombreImagen: imagesData.nombreImagen,
            imgUrl: item.url,
          });
        });
      }
    );

  }

  async guardarImagen(imagen: { imgUrl: string | undefined; nombreImagen: string }): Promise<any> {
    try {
      return await this.db.collection('rostros').add(imagen);
    } catch (err) {
      console.log(err);
    }
  }

  public eliminarImagen(id: string, imagenNombre: string) {
    const storageRef = this.storage.ref(`${this.CARPETA_IMAGENES}/${imagenNombre.replace(/ /g, '')}`);

    storageRef.delete().toPromise()
      .then(() => {
        Swal.fire('EXITO', 'El registro se eliminó correctamente', 'success');
      })
      .catch((err) => {
        console.error(err);
      });

    return this.imagenesCollection.doc(id).delete();
  }
}
