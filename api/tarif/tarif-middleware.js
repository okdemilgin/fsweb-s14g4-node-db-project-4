const tarifModel = require('./tarif-model');

const checkTarifId = async(req,res,next) => {
    try {
        let isExistTarif = await tarifModel.idyeGoreTarifGetir(req.params.id);
        if(!isExistTarif){
            res.status(404).json({message:"tarif bulunamadı"})
        }else{
            req.existTarif = isExistTarif;
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {checkTarifId}