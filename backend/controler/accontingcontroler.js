const accounting=require('../modal/Accountingmodel')

const addaccounting=async(req,res)=>{
    try {
        const newreport=await accounting.create(req.body)
        res.status(200).json(newreport)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"unable to create item"})
    }
}

module.exports=addaccounting