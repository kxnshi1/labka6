const errors={'22P02':'Неверный формат значения','23502':'Не заполнено обязательное поле','23503':'Связанная запись не найдена','23514':'Значение не проходит проверку в БД'};
export function errorHandler(err,req,res,next){
 if(errors[err.code]) return res.status(400).json({error:errors[err.code],detail:err.message});
 console.error(err);res.status(500).json({error:'Внутренняя ошибка сервера'});
}
