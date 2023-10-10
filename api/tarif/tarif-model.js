const db = require('../../data/db-config');

async function adimIdyeGoreMalzemeGetir(adim_id) {
    let malzemeler = await db("malzemeler_adimlar as ma")
                            .leftJoin("malzemeler as m", "m.malzeme_id", "ma.malzeme_id")
                            .leftJoin("adimlar as a", "a.adim_id", "ma.adim_id")
                            .select("ma.malzeme_id","m.malzeme_adi","ma.miktar")
                            .where("ma.adim_id",adim_id);
    return malzemeler;
}

async function idyeGoreTarifGetir(tarif_id){
    const tarifler = await db("tarifler as t")
                                .leftJoin("adimlar as a","t.tarif_id","a.tarif_id")
                                .leftJoin("malzemeler_adimlar as ma","ma.adim_id","a.adim_id")
                                .leftJoin("malzemeler as m","m.malzeme_id","ma.malzeme_id")
                                .select("t.*","a.adim_id","a.adim_sirasi","a.adim_talimati",
                                        "m.malzeme_id","m.malzeme_adi","ma.miktar")
                                .where("t.tarif_id",tarif_id)

    if(tarifler.length == 0){
        return null;
    }

    let responseData = {
        tarif_id:tarifler[0].tarif_id,
        tarif_adi:tarifler[0].tarif_adi,
        kayit_tarihi:tarifler[0].kayit_tarihi,
        adimlar:[]
    }

    for (let i = 0; i < tarifler.length; i++) {
        const item = tarifler[i];
        let adimModel = {
            adim_id:item.adim_id,
            adim_sirasi:item.adim_sirasi,
            adim_talimati:item.adim_talimati,
            malzemeler:[]
        }
        if(!!item.malzeme_id){
            let fromDb = await adimIdyeGoreMalzemeGetir(item.adim_id)
            adimModel.malzemeler = fromDb
        }
        responseData.adimlar.push(adimModel);
    }
    return responseData;
}

module.exports = {idyeGoreTarifGetir}