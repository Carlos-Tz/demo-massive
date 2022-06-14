import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/angular2-signaturepad';
import 'fecha';
import fechaObj from 'fecha';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
// import { Ng2ImgMaxService } from 'ng2-img-max';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { Form } from 'src/app/models/form';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare let $: any;


@Component({
  selector: 'app-edit-orden',
  templateUrl: './edit-orden.component.html',
  styleUrls: ['./edit-orden.component.css']
})
export class EditOrdenComponent implements OnInit, AfterViewInit {

  public canvasWidth = 180;
  public needleValue = 50;
  public centralLabel = '';
  public name = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'red',
    needleUpdateSpeed: 1000,
    /* arcColors: ['red', 'yellow', 'black'],
    arcDelimiters: [33, 67], */
    arcColors: ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
    arcDelimiters: [6, 17, 21, 32, 36, 47, 53, 64, 68, 79, 83, 94],
    rangeLabel: ['E', 'F'],
    needleStartValue: 50,
  };
  ord = 0;
  myformValuesChanges$;
  total = 0;
  totalr = 0;
  iva = 0;
  obra = 0;
  otros = 0;
  cargos = 0;
  seguro = 0;
  subtotal = 0;
  anticipo = 0;
  saldo = 0;

  public air = false;
  public eng = false;
  public abs = false;
  public oil = false;
  public bat = false;
  public cin = false;
  public fre = false;
  public lig = false;
  public sta = false;
  public tem = false;
  public pot = false;
  public qua = false;
  public gen = false;
  /* public tal = false;
  public pre = false;
  public vol = false; */
  public lock = true;
  public fecha = '';
  public nameC = '';
  public ingresoC = '';
  public salidaC = '';
  /* idiomaA = 'espaniol'; */
  uploadedImage: Blob;
  public filePathI1 = '';
  public filePathI2 = '';
  public filePathI3 = '';
  public filePathI4 = '';
  public filePathI5 = '';
  public filePathI6 = '';
  public filePathI7 = '';
  public filePathI8 = '';
  public filePathI9 = '';
  public filePathI10 = '';
  public filePathI11 = '';
  public filePathI12 = '';
  public filePathf1 = '';
  public filePathf2 = '';
  public filePathf3 = '';
  public filePathf4 = '';

  @ViewChild('sig1', { static: false }) signaturePad: SignaturePad;
  @ViewChild('sig2', { static: false }) signaturePad2: SignaturePad;
  @ViewChild('sig3', { static: false }) signaturePad3: SignaturePad;
  @ViewChild('sig4', { static: false }) signaturePad4: SignaturePad;
  public signaturePadOptions: object = {
    minWidth: 0.7,
    maxWidth: 0.8,
    penColor: 'rgb(255,0,0)',
    canvasWidth: 180, // 189
    canvasHeight: 125 // 125
  };
  save = 2;
  key = '';
  forms: Form[];
  ff = new Date;
  myForm: FormGroup;
  orden = {
    tcar: 'sedan',
    gas: 50
  };

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    // console.log('Processing beforeunload...');
    // Do more processing...
    event.returnValue = false;
  }
  constructor(
    private fb: FormBuilder,
    public formApi: ApiService,
    public toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    // private ng2ImgMax: Ng2ImgMaxService,
    private storage: AngularFireStorage,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.sForm();
    this.formApi.GetOrden(this.key).valueChanges().subscribe(data => {
      this.myForm.patchValue(data);
      if (this.myForm.get('dere').value) {
        this.signaturePad.fromData(this.myForm.get('dere').value);
      }
      if (this.myForm.get('nombre').value) {
        this.nameC = this.myForm.get('nombre').value;
        /* this.signaturePad.fromData(this.myForm.get('dere').value); */
      }
      if (this.myForm.get('frente').value) {
        this.signaturePad2.fromData(this.myForm.get('frente').value);
      }
      if (this.myForm.get('detras').value) {
        this.signaturePad3.fromData(this.myForm.get('detras').value);
      }
      if (this.myForm.get('izq').value) {
        this.signaturePad4.fromData(this.myForm.get('izq').value);
      }
      this.needleValue = this.myForm.get('gas').value;
      if (this.myForm.get('bolsa').value) {
        this.air = this.myForm.get('bolsa').value;
      }
      if (this.myForm.get('motor').value) {
        this.eng = this.myForm.get('motor').value;
      }
      if (this.myForm.get('abs').value) {
        this.abs = this.myForm.get('abs').value;
      }
      if (this.myForm.get('aceite').value) {
        this.oil = this.myForm.get('aceite').value;
      }
      if (this.myForm.get('bateria').value) {
        this.bat = this.myForm.get('bateria').value;
      }
      if (this.myForm.get('cinturon').value) {
        this.cin = this.myForm.get('cinturon').value;
      }
      if (this.myForm.get('freno').value) {
        this.fre = this.myForm.get('freno').value;
      }
      if (this.myForm.get('luces').value) {
        this.lig = this.myForm.get('luces').value;
      }
      if (this.myForm.get('estabi').value) {
        this.sta = this.myForm.get('estabi').value;
      }
      if (this.myForm.get('temper').value) {
        this.tem = this.myForm.get('temper').value;
      }
      if (this.myForm.get('potosi').value) {
        this.pot = this.myForm.get('potosi').value;
      }
      if (this.myForm.get('qualitas').value) {
        this.qua = this.myForm.get('qualitas').value;
      }
      if (this.myForm.get('general').value) {
        this.gen = this.myForm.get('general').value;
      }
      if (this.myForm.get('lock').value) {
        this.lock = true;
      }
      $("#contSign").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign2").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign3").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign4").each(function (){ this.style.pointerEvents = 'none'; });
    });
    this.formApi.GetFormsList().snapshotChanges().subscribe(data => {
      this.forms = [];
      data.forEach(item => {
        const form = item.payload.toJSON();
        form['$key'] = item.key;
        this.forms.push(form as Form);
      });
    });
  }

  ngAfterViewInit() {
    this.signaturePad.off();
    this.signaturePad2.off();
    this.signaturePad3.off();
    this.signaturePad4.off();
  }

  sForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      orden: ['', [Validators.required]],
      marca: [''],
      modelo: [''],
      anio: [''],
      color: [''],
      km: [''],
      placas: [''],
      serie: [''],
      grua: [''],
      ingreso: [''],
      salida: [''],
      tel: [''],
      correo: [''],
      trabajo: [''],
      observ: [''],
      bolsa: [false],
      motor: [false],
      abs: [false],
      aceite: [false],
      bateria: [false],
      cinturon: [false],
      freno: [false],
      luces: [false],
      estabi: [false],
      temper: [false],
      potosi: [false],
      qualitas: [false],
      general: [false],
      /* tall: [false],
      presion: [false],
      volante: [false], */
      lock: [true],
      gato: [false],
      antena: [false],
      herrami: [false],
      emblemas: [false],
      triang: [false],
      tapones: [false],
      tapetes: [false],
      cables: [false],
      llantar: [false],
      stereo: [false],
      exting: [false],
      encend: [false],
      gas: [50],
      tcar: ['sedan'],
      dere: [''],
      frente: [''],
      detras: [''],
      izq: [''],
      firma1: [''],
      firma2: [''],
      firma1n: [''],
      firma2n: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      img4: [''],
      img5: [''],
      img6: [''],
      img7: [''],
      img8: [''],
      img9: [''],
      img10: [''],
      img11: [''],
      img12: [''],
      img1n: [''],
      img2n: [''],
      img3n: [''],
      img4n: [''],
      img5n: [''],
      img6n: [''],
      img7n: [''],
      img8n: [''],
      img9n: [''],
      img10n: [''],
      img11n: [''],
      img12n: [''],
      desc1: [''],
      desc2: [''],
      desc3: [''],
      desc4: [''],
      desc5: [''],
      desc6: [''],
      desc7: [''],
      desc8: [''],
      firma3: [''],
      firma4: [''],
      firma3n: [''],
      firma4n: [''],
      fecha: ['']
    });
  }

  ResetForm() {
    this.myForm.reset();
  }

  submitSurveyData = () => {
    this.formApi.UpdateOrden(this.myForm.value, this.key);
    /* this.formApi.AddOrden(this.myForm.value); */
    this.toastr.success('Actualizar!');
  }

  combus(ev) {
    this.needleValue = ev.srcElement.value;
  }

  nameS(ev) {
    /* this.needleValue = ev.srcElement.value; */
    this.formApi.GetForm(ev.srcElement.value).valueChanges().subscribe(data => {
      if (data.nombre && data.tel && data.email){
        this.myForm.patchValue({correo: data.email});
        this.myForm.patchValue({tel: data.tel});
        this.myForm.patchValue({nombre: data.nombre});
        this.nameC = data.nombre;
        /* console.log(data.email);
        console.log(data.tel); */
      }
      /* this.myForm.patchValue(data); */
    });
  }

  airbag() {
    this.air = !this.air;
    this.myForm.patchValue({bolsa: this.air});
    //  this.form_.airbag = !this.form_.airbag;
  }

  engine() {
    this.eng = !this.eng;
    this.myForm.patchValue({motor: this.eng});
  }

  abs_() {
    this.abs = !this.abs;
    this.myForm.patchValue({abs: this.abs});
  }

  oil_() {
    this.oil = !this.oil;
    this.myForm.patchValue({aceite: this.oil});
  }
  battery_() {
    this.bat = !this.bat;
    this.myForm.patchValue({bateria: this.bat});
  }
  cintu_() {
    this.cin = !this.cin;
    this.myForm.patchValue({cinturon: this.cin});
  }
  freno_() {
    this.fre = !this.fre;
    this.myForm.patchValue({freno: this.fre});
  }
  lights_() {
    this.lig = !this.lig;
    this.myForm.patchValue({luces: this.lig});
  }
  stabil_() {
    this.sta = !this.sta;
    this.myForm.patchValue({estabi: this.sta});
  }
  temper_() {
    this.tem = !this.tem;
    this.myForm.patchValue({temper: this.tem});
  }
  potosi_() {
    this.pot = !this.pot;
    this.myForm.patchValue({potosi: this.pot});
  }
  qualitas_() {
    this.qua = !this.qua;
    this.myForm.patchValue({qualitas: this.qua});
  }
  general_() {
    this.gen = !this.gen;
    this.myForm.patchValue({general: this.gen});
  }
  /* tall_() {
    this.tal = !this.tal;
    this.myForm.patchValue({tall: this.tal});
  }
  presion_() {
    this.pre = !this.pre;
    this.myForm.patchValue({presion: this.pre});
  }
  volante_() {
    this.vol = !this.vol;
    this.myForm.patchValue({volante: this.vol});
  } */
  lock_() {
    this.lock = !this.lock;
    if (this.lock){
      $("#contSign").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign2").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign3").each(function (){ this.style.pointerEvents = 'none'; });
      $("#contSign4").each(function (){ this.style.pointerEvents = 'none'; });
      this.signaturePad.off();
      this.signaturePad2.off();
      this.signaturePad3.off();
      this.signaturePad4.off();
    }else{
      $("#contSign").each(function (){ this.style.pointerEvents = 'auto'; });
      $("#contSign2").each(function (){ this.style.pointerEvents = 'auto'; });
      $("#contSign3").each(function (){ this.style.pointerEvents = 'auto'; });
      $("#contSign4").each(function (){ this.style.pointerEvents = 'auto'; });
      this.signaturePad.on();
      this.signaturePad2.on();
      this.signaturePad3.on();
      this.signaturePad4.on();
    }
    this.myForm.patchValue({lock: this.lock});
  }

  drawComplete() {
    this.myForm.patchValue({dere: this.signaturePad.toData()});
  }
  drawComplete2() {
    this.myForm.patchValue({frente: this.signaturePad2.toData()});
  }
  drawComplete3() {
    this.myForm.patchValue({detras: this.signaturePad3.toData()});
  }
  drawComplete4() {
    this.myForm.patchValue({izq: this.signaturePad4.toData()});
  }
  clear1() {
    //this.signaturePad.off();
    this.signaturePad.clear();
    this.myForm.patchValue({dere: []});
  }

  clear2() {
    //this.signaturePad.on();
    this.signaturePad2.clear();
    this.myForm.patchValue({frente: []});
  }

  clear3() {
    this.signaturePad3.clear();
    this.myForm.patchValue({detras: []});
  }

  clear4() {
    this.signaturePad4.clear();
    this.myForm.patchValue({izq: []});
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  /* updt() {
    //this.subtotal = this.totalRef + this.obra + this.otros;
    this.subtotal = this.totalr + this.myForm.get('manoo').value + this.myForm.get('cargos').value + this.myForm.get('otrosm').value + this.myForm.get('seguro').value;
    this.iva = Math.round(this.subtotal * 0.16);
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.myForm.get('antici').value;
  } */

  readThis(inputValue: any): void {
    const ima = inputValue.files[0]; 
    const reader = new FileReader();
    if (ima) {
      reader.readAsDataURL(ima);
    }

    reader.onloadend = () => {
      const imgURL = reader.result as string;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      this.uploadedImage = this.b64toBlob(realData, contentType);
      if (inputValue.name === 'img1') {
        if (this.filePathI1 !== '') {
          const ref = this.storage.ref(this.filePathI1);
          ref.delete();
        }
        this.filePathI1 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI1);
        this.storage.upload(this.filePathI1, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img1: url});
              this.myForm.patchValue({img1n: this.filePathI1});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img2') {
          if (this.filePathI2 !== '') {
            const ref = this.storage.ref(this.filePathI2);
            ref.delete();
          }
          this.filePathI2 = `images_massive/image_${Date.now()}`;
          const fileRef = this.storage.ref(this.filePathI2);
          this.storage.upload(this.filePathI2, this.uploadedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.myForm.patchValue({img2: url});
              this.myForm.patchValue({img1n: this.filePathI2});
                this.toastr.success('Imagen cargada correctamente!');
              });
            })
          ).subscribe();
        }
      if (inputValue.name === 'img3') {
        if (this.filePathI3 !== '') {
          const ref = this.storage.ref(this.filePathI3);
          ref.delete();
        }
        this.filePathI3 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI3);
        this.storage.upload(this.filePathI3, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img3: url});
              this.myForm.patchValue({img1n: this.filePathI3});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img4') {
        if (this.filePathI4 !== '') {
          const ref = this.storage.ref(this.filePathI4);
          ref.delete();
        }
        this.filePathI4 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI4);
        this.storage.upload(this.filePathI4, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img4: url});
              this.myForm.patchValue({img1n: this.filePathI4});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img5') {
        if (this.filePathI5 !== '') {
          const ref = this.storage.ref(this.filePathI5);
          ref.delete();
        }
        this.filePathI5 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI5);
        this.storage.upload(this.filePathI5, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img5: url});
              this.myForm.patchValue({img1n: this.filePathI5});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img6') {
        if (this.filePathI6 !== '') {
          const ref = this.storage.ref(this.filePathI6);
          ref.delete();
        }
        this.filePathI6 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI6);
        this.storage.upload(this.filePathI6, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img6: url});
              this.myForm.patchValue({img1n: this.filePathI6});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img7') {
        if (this.filePathI7 !== '') {
          const ref = this.storage.ref(this.filePathI7);
          ref.delete();
        }
        this.filePathI7 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI7);
        this.storage.upload(this.filePathI7, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img7: url});
              this.myForm.patchValue({img1n: this.filePathI7});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img8') {
        if (this.filePathI8 !== '') {
          const ref = this.storage.ref(this.filePathI8);
          ref.delete();
        }
        this.filePathI8 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI8);
        this.storage.upload(this.filePathI8, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img8: url});
              this.myForm.patchValue({img1n: this.filePathI8});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img9') {
        if (this.filePathI9 !== '') {
          const ref = this.storage.ref(this.filePathI9);
          ref.delete();
        }
        this.filePathI9 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI9);
        this.storage.upload(this.filePathI9, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img9: url});
              this.myForm.patchValue({img1n: this.filePathI9});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img10') {
        if (this.filePathI10 !== '') {
          const ref = this.storage.ref(this.filePathI10);
          ref.delete();
        }
        this.filePathI10 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI10);
        this.storage.upload(this.filePathI10, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img10: url});
              this.myForm.patchValue({img1n: this.filePathI10});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img11') {
        if (this.filePathI11 !== '') {
          const ref = this.storage.ref(this.filePathI11);
          ref.delete();
        }
        this.filePathI11 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI11);
        this.storage.upload(this.filePathI11, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img11: url});
              this.myForm.patchValue({img1n: this.filePathI11});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
      if (inputValue.name === 'img12') {
        if (this.filePathI12 !== '') {
          const ref = this.storage.ref(this.filePathI12);
          ref.delete();
        }
        this.filePathI12 = `images_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathI12);
        this.storage.upload(this.filePathI12, this.uploadedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({img12: url});
              this.myForm.patchValue({img1n: this.filePathI12});
              this.toastr.success('Imagen cargada correctamente!');
            });
          })
        ).subscribe();
      }
    };

  }

  imgChanged($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image') ) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        if (this.filePathf1 !== '') {
          const ref = this.storage.ref(this.filePathf1);
            ref.delete();
        }
        this.filePathf1 = `signs_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf1);
        this.storage.upload(this.filePathf1, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({firma1: url});
              this.myForm.patchValue({firma1n: this.filePathf1});
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged2($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image') ) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        if (this.filePathf2 !== '') {
          const ref = this.storage.ref(this.filePathf2);
            ref.delete();
        }
        this.filePathf2 = `signs_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf2);
        this.storage.upload(this.filePathf2, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({firma2: url});
              this.myForm.patchValue({firma2n: this.filePathf2});
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged3($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image') ) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        if (this.filePathf3 !== '') {
          const ref = this.storage.ref(this.filePathf3);
            ref.delete();
        }
        this.filePathf3 = `signs_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf3);
        this.storage.upload(this.filePathf3, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({firma3: url});
              this.myForm.patchValue({firma3n: this.filePathf3});
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  imgChanged4($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      if (imgURL.startsWith('data:image') ) {
        const block = imgURL.split(';');
        const contentType = block[0].split(':')[1];
        const realData = block[1].split(',')[1];
        const blob = this.b64toBlob(realData, contentType);
        if (this.filePathf4 !== '') {
          const ref = this.storage.ref(this.filePathf4);
            ref.delete();
        }
        this.filePathf4 = `signs_massive/image_${Date.now()}`;
        const fileRef = this.storage.ref(this.filePathf4);
        this.storage.upload(this.filePathf4, blob).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.myForm.patchValue({firma4: url});
              this.myForm.patchValue({firma4n: this.filePathf4});
              this.toastr.success('Firma Actualizada!');
            });
          })
        ).subscribe();
      }
    }
  }
  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}


