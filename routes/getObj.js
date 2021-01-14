// Middle-ware
function getObject(Obj){
    return async function (req, res, next){
        try{
            obj = await Obj.findById(req.params.id)
            if(obj == null){
                return res.status(404).json({ message: 'Cannot find data' })
            }
        }catch(err){
            return res.status(500).json({ message: err.message })
        }
    
        res.obj = obj
        next()
    }
}


module.exports = getObject