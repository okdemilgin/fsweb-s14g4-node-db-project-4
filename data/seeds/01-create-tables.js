/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const defaultTarifler = [
  {tarif_adi: "Spagetti Bolonez"},
  {tarif_adi: "Mantı"}
];
const defaultAdimlar = [
  {adim_id:1,adim_sirasi:1, adim_talimati:"Büyük bir tencereyi orta ateşe koyun", tarif_id:1},
  {adim_id:2,adim_sirasi:2, adim_talimati:"1 yemek kaşığı zeytinyağı ekleyin", tarif_id:1},
  {adim_id:3,adim_sirasi:2, adim_talimati:"Tuz ekleyin", tarif_id:1},
  
  {adim_id:4,adim_sirasi:1, adim_talimati:"Büyük bir tencereyi orta ateşe koyun", tarif_id:2},
  {adim_id:5,adim_sirasi:2, adim_talimati:"1 yemek kaşığı zeytinyağı ekleyin", tarif_id:2},
  {adim_id:6,adim_sirasi:2, adim_talimati:"Tuz ekleyin", tarif_id:2}
];
const defaultMalzemeler = [
  {malzeme_adi:"zeytinyağı"},
  {malzeme_adi:"tuz"}
];
const defaultMalzemelerAdimlar = [
  {malzeme_id:1, adim_id:2, miktar:0.5},
  {malzeme_id:1, adim_id:5, miktar:1},
  {malzeme_id:2, adim_id:3, miktar:5},
  {malzeme_id:2, adim_id:6, miktar:10}
];

exports.seed = async function(knex) {
  await knex('tarifler').truncate()
  await knex('adimlar').truncate()
  await knex('malzemeler').truncate()
  await knex('malzemeler_adimlar').truncate();

  await knex('tarifler').insert(defaultTarifler)
  await knex('adimlar').insert(defaultAdimlar)
  await knex('malzemeler').insert(defaultMalzemeler)
  await knex('malzemeler_adimlar').insert(defaultMalzemelerAdimlar);
};