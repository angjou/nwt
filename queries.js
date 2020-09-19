const { request, response } = require("express");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "password",
    port: 5432
});

const getStories = ( request, response) => {
    pool.query(
        'SELECT * FROM public."STORIES";',
        (error, result) =>{
        if(error) throw error;
        response.status(200).json(result.rows);
        }
    );

};

const submitStory = ( request, response) => {
    console.log(request.body)
    const{
        title,
        description,
        filename
    }= request.body;
    pool.query(
        'INSERT INTO public."STORIES"(story_id, title, description, image) VALUES (DEFAULT, $1, $2, $3);',
        [title,
        description,
        filename],
        (error, result) =>{
        if(error) {
        throw error;}
        response.status(200).send('Story added');
        }
    );

};
const deleteStory = (request,response)=>{
    const story_id= parseInt(request.params.story_id);
    pool.query(
       ` DELETE FROM public."STORIES" WHERE story_id = $1;`,
       [story_id],
       (error, result) =>{
        if(error) {
        throw error;}
        response.status(200).send('Story deleted');
       }
    )
}
const updateStory=(request,response)=>{
    const story_id= parseInt(request.params.story_id);
    const{
        title,
        description,
    }= request.body;
    console.log(request.body)
    pool.query(
       ` UPDATE public."STORIES" SET  title=$2, description=$3 WHERE story_id = $1;`,
       [story_id,
        title,
        description
    ],
       (error, result) =>{
        if(error) {
        throw error;}
        response.status(200).send('Story deleted');
       }
    )
}



module.exports = {
    getStories,
    submitStory,
    deleteStory,
    updateStory

};