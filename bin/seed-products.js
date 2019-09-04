require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');
const dbName = process.env.MONGODB_URI;
mongoose.Promise = Promise;

const products = [
{ mostrar:true, presentacion: 'Caja', ref:	1,	
  titulo:	'Lavavajillas Gel, 30 lavados (16 uds)',	
  descripcionCorta:	'Foto no contractual',	
  descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	
  categoria:	'Limpieza',	
  stock:	41,	
  unidadesPorCaja:	16,	
  minCantidad:	0,	
  maxCantidad:	1000,	
  precioOriginal:	4.8,	
  porcentajeAcompartir:	5,	
  precioAcompartir:	3.84,	
  cajasPorPalet:	117,	
  pesoPorCaja:	7,	
  company:	'Mercadona',
  foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/lavavajillas-gel-30-lavados-16-uds_kisztu.png'
},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/locion-limpiadora_vjwvhg.png', mostrar:true, presentacion: 'Caja', ref:	2,	titulo:	'Locion limpiadora 295ml (12 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	34,	unidadesPorCaja:	12,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	14.11,	porcentajeAcompartir:	5,	precioAcompartir:	8.466,	cajasPorPalet:	119,	pesoPorCaja:	4.4,	company:	'Laboratorios Galderma '},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/recambio-fregona_dnvfjl.png', mostrar:true, presentacion: 'Caja', ref:	3,	titulo:	'Recambio Fregona (80 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Limpieza',	stock:	12,	unidadesPorCaja:	80,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	2.19,	porcentajeAcompartir:	5,	precioAcompartir:	8.76,	cajasPorPalet:	10,	pesoPorCaja:	4.5,	company:	'Vileda'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/mascarilla-pelo-monodosis_lyxzkf.png', mostrar:true, presentacion: 'Caja', ref:	4,	titulo:	'Mascarilla pelo monodosis 10ml (540 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	69,	unidadesPorCaja:	540,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	0.1,	porcentajeAcompartir:	5,	precioAcompartir:	2.7,	cajasPorPalet:	42,	pesoPorCaja:	7.6,	company:	'LOreal'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548213/images/product/champu-monodosis_nzzbpm.png', mostrar:true, presentacion: 'Caja', ref:	5,	titulo:	'Champú monodosis 9,7ml (540 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	109,	unidadesPorCaja:	540,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	0.1,	porcentajeAcompartir:	5,	precioAcompartir:	2.7,	cajasPorPalet:	40,	pesoPorCaja:	8,	company:	'LOreal'},
{mostrar:true, presentacion: 'Caja', ref:	6,	titulo:	'Crema cara monodosis (1.980 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	15,	unidadesPorCaja:	1980,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	0.1,	porcentajeAcompartir:	5,	precioAcompartir:	9.9,	cajasPorPalet:	48,	pesoPorCaja:	6.35,	company:	'LOreal'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548213/images/product/after-sun_qmauvu.png', mostrar:true, presentacion: 'Caja', ref:	7,	titulo:	'After sun 200ml (40 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	8,	unidadesPorCaja:	40,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	6.74,	porcentajeAcompartir:	5,	precioAcompartir:	13.48,	cajasPorPalet:	50,	pesoPorCaja:	9.5,	company:	'Beiersdorf'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548213/images/product/aceite-proteccion_unlae8.png', mostrar:true, presentacion: 'Caja', ref:	8,	titulo:	'Aceite proteccion solar SPF 30 (35 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	1,	unidadesPorCaja:	35,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	14,	porcentajeAcompartir:	5,	precioAcompartir:	24.5,	cajasPorPalet:	40,	pesoPorCaja:	7,	company:	'Beiersdorf'},
{mostrar:true, presentacion: 'Caja', ref:	9,	titulo:	'Agua micelar 250ml (24 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	23,	unidadesPorCaja:	24,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	4,	porcentajeAcompartir:	5,	precioAcompartir:	4.8,	cajasPorPalet:	72,	pesoPorCaja:	6.8,	company:	'Laboratorios Isdin'},
{mostrar:true, presentacion: 'Palet', ref:	10,	titulo:	'Palet productos puericultura (1200 uds aprox)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Bebés',	stock:	1,	unidadesPorCaja:	1200,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	5.79,	porcentajeAcompartir:	5,	precioAcompartir:	347.4,	cajasPorPalet:	1,	pesoPorCaja:	271,	company:	'Suavinex'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548215/images/product/ropa-interior-mujer-50-uds-aprox_peyot1.png', mostrar:true, presentacion: 'Caja', ref:	11,	titulo:	'Ropa interior mujer y de dormir mujer (40 uds. aprox.)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Ropa',	stock:	1,	unidadesPorCaja:	80,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	4,	porcentajeAcompartir:	5,	precioAcompartir:	16,	cajasPorPalet:	19,	pesoPorCaja:	14.986,	company:	'ETAM'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/jabon-30_hjcbzk.png', mostrar:true, presentacion: 'Caja', ref:	12,	titulo:	'Jabon 30 gr (200 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	385,	unidadesPorCaja:	200,	minCantidad:	0,	maxCantidad:	70,	precioOriginal:	0.47,	porcentajeAcompartir:	5,	precioAcompartir:	4.7,	cajasPorPalet:	70,	pesoPorCaja:	7.05,	company:	'Garcia de Pou'},
{mostrar:true, presentacion: 'Caja', ref:	13,	titulo:	'Papel higienico (108 rollos)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	234,	unidadesPorCaja:	108,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	0.85,	porcentajeAcompartir:	5,	precioAcompartir:	4.59,	cajasPorPalet:	26,	pesoPorCaja:	6.4,	company:	'Goma-Camps'},
{mostrar:true, presentacion: 'Caja', ref:	14,	titulo:	'Sabana esteril 150x240 (30 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Hogar',	stock:	1,	unidadesPorCaja:	30,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	1,	porcentajeAcompartir:	5,	precioAcompartir:	1.5,	cajasPorPalet:	24,	pesoPorCaja:	7,	company:	'Juvazquez'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548213/images/product/crema-cuerpo_zl1qso.png', mostrar:true, presentacion: 'Caja', ref:	15,	titulo:	'Crema de cuerpo 400ml (6 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	1257,	unidadesPorCaja:	6,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	8.95,	porcentajeAcompartir:	5,	precioAcompartir:	2.685,	cajasPorPalet:	200,	pesoPorCaja:	1.75,	company:	'LOreal'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548215/images/product/tinte-castan%CC%83o_ago5fv.png', mostrar:true, presentacion: 'Caja', ref:	16,	titulo:	'Tinte castaño (6 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	884,	unidadesPorCaja:	6,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	6.35,	porcentajeAcompartir:	5,	precioAcompartir:	1.905,	cajasPorPalet:	84,	pesoPorCaja:	1.76,	company:	'LOreal'},
{mostrar:true, presentacion: 'Caja', ref:	17,	titulo:	'Maquillaje color carne normal (48 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	16,	unidadesPorCaja:	48,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	11.95,	porcentajeAcompartir:	5,	precioAcompartir:	28.68,	cajasPorPalet:	19,	pesoPorCaja:	6.5,	company:	'LOreal'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/estropajos_dldent.png', mostrar:true, presentacion: 'Caja', ref:	18,	titulo:	'Estropajos (20 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Limpieza',	stock:	58,	unidadesPorCaja:	20,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	2.1,	porcentajeAcompartir:	5,	precioAcompartir:	2.1,	cajasPorPalet:	80,	pesoPorCaja:	0.55,	company:	'3M'},
{mostrar:true, presentacion: 'Caja', ref:	19,	titulo:	'Maquillaje crema facial- carne normal (90 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	24,	unidadesPorCaja:	90,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	8.24,	porcentajeAcompartir:	5,	precioAcompartir:	37.08,	cajasPorPalet:	38,	pesoPorCaja:	1.58,	company:	'LOreal'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548213/images/product/crema-cuidado-rojeces_excyd9.png', mostrar:true, presentacion: 'Caja', ref:	20,	titulo:	'Crema cuidado rojeces 50ml (100 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	3,	unidadesPorCaja:	100,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	13.16,	porcentajeAcompartir:	5,	precioAcompartir:	65.8,	cajasPorPalet:	50,	pesoPorCaja:	6.25,	company:	'Laboratorios BABE '},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548213/images/product/crema-hidratante-cara_lmg6ph.png', mostrar:true, presentacion: 'Caja', ref:	21,	titulo:	'Crema hidratante cara 5ml (400 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	69,	unidadesPorCaja:	400,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	1.45,	porcentajeAcompartir:	5,	precioAcompartir:	29,	cajasPorPalet:	80,	pesoPorCaja:	3.25,	company:	'Laboratorios BABE '},
{mostrar:true, presentacion: 'Palet', ref:	22,	titulo:	'Jabon de manos 500ml  (1.008 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	8,	unidadesPorCaja:	1008,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	0.95,	porcentajeAcompartir:	5,	precioAcompartir:	47.88,	cajasPorPalet:	1,	pesoPorCaja:	573,	company:	'Iberfrasa'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548213/images/product/gel-ban%CC%83o_alrzrx.png', mostrar:true, presentacion: 'Caja', ref:	23,	titulo:	'Gel de baño 750ml (14 uds)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Higiene',	stock:	511,	unidadesPorCaja:	14,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	1.55,	porcentajeAcompartir:	5,	precioAcompartir:	1.085,	cajasPorPalet:	60,	pesoPorCaja:	10,	company:	'Iberfrasa'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548215/images/product/servilleta-peppa-pig_duf8rc.png', mostrar:true, presentacion: 'Caja', ref:	24,	titulo:	'Servilletas Peppa Pig  (24 paquetes)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Limpieza',	stock:	311,	unidadesPorCaja:	24,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	1.04,	porcentajeAcompartir:	5,	precioAcompartir:	1.248,	cajasPorPalet:	28,	pesoPorCaja:	4,	company:	'Essity'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/pan%CC%83ales-braguita_k9ocrx.png', mostrar:true, presentacion: 'Caja', ref:	25,	titulo:	'Pañales braguita 8-14 Kg (9 packs)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Bebés',	stock:	403,	unidadesPorCaja:	9,	minCantidad:	0,	maxCantidad:	1000,	precioOriginal:	7.45,	porcentajeAcompartir:	5,	precioAcompartir:	3.3525,	cajasPorPalet:	40,	pesoPorCaja:	9,	company:	'Essity'},
{foto: 'https://res.cloudinary.com/acompartirapp/image/upload/v1567548214/images/product/papel-cocina_wn1kok.png', mostrar:true, presentacion: 'Caja', ref:	26,	titulo:	'Papel cocina (6 rollos)',	descripcionCorta:	'Foto no contractual',	descripcion:	'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',	categoria:	'Limpieza',	stock:	33,	unidadesPorCaja:	6,	minCantidad:	0,	maxCantidad:	10,	precioOriginal:	1.28,	porcentajeAcompartir:	5,	precioAcompartir:	0.384,	cajasPorPalet:	10,	pesoPorCaja:	6.5,	company:	'Essity'}
]

const productsProcesados = products.map(product => {
  product.totalCantidad = product.stock * product.unidadesPorCaja;
  product.precioOriginalTotal = product.precioOriginal * product.unidadesPorCaja;
  return product;
})

mongoose.connect(dbName)
  .then(() => {
    Product.create(productsProcesados)
    .then(products => {
      products.forEach(product => {
        console.log(`${product.titulo} ha sido creado!`)
      })
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })


