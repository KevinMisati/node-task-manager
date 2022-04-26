const Task  = require("../models/Task")
const asyncWrapper = require("../middleware/async")
const {createCustomError} = require("../errors/custom-errors")


const getAllTasks =asyncWrapper( async (req,res) => {
   
        const tasks = await Task.find({})
        res.status(200).json({tasks})
}
)
const createTasks  = asyncWrapper(async (req, res) => {
    
        const task = await Task.create(req.body)
        res.status(201).json({task})
    
    
    
    
})
const getTask = asyncWrapper(async (req, res,next) => {
        const {id:taskId}= req.params
        const task = await Task.findOne({_id:taskId})
        if(!task){
            return next(createCustomError(`No task with id : ${taskId}`,404))
        }
        
    return res.status(200).json({task})
    
    
    
})

const deleteTask = asyncWrapper(async (req, res) => {
    
        const {id:taskId} = req.params
        const task = await Task.findOneAndDelete({_id:taskId})
        if(!task){
            return next(createCustomError(`No task with id : ${taskId}`,404))
        }
        //res.status(200).json({task})
        res.status(200).send()

    
})

const updateTask = asyncWrapper(async (req, res) => {
    
        const {id:taskId} = req.params
        const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            return next(createCustomError(`No task with id : ${taskId}`,404))
        }

        res.status(200).json({task})

})

module.exports ={getAllTasks,createTasks,getTask,updateTask,deleteTask}