

/** 处理每行的规则
 * @param regexp 处理该行的正则
 * @param value 返回该行处理过后的格式，例如："# ${key} #"。 则${key}为原行内容。
 * @param line 是处理整行数据，还是处理该行符合正则的内容
 * @param left 当处理非整行数据时，用于处理结果的前半段
 * @param right 当处理非整行数据时，用于处理结果的后半段
 */
interface Rule {
    regexp :RegExp,         //处理每行内容的正则
    value :string,       
    line? :boolean,
    left? :string,
    right? :string,
    key? :RuleKey,
}
/** 处理结果
 * @param revise 该内容是否被处理过
 * @param value 处理后的内容，如revise为false则代表当前内容并未被修改
 */
interface ProcessingResult {
    revise :boolean,       
    value :string,
}

/** 基本配置
 * @param trim 是否缩进左右空格
 * @param br   是否原数据每行还原。（就是换行不？） 
 *              如不设置则每行不换行 则按rule里的value设置，注意换行在markdown语法是两个空格+\n
 */
type RuleType = 'episodes' | 'biography'; 
interface Option {
    trim? :boolean          
    br? : boolean,
    type? :RuleType,           
}

/**
 * 关键字。
 * @param name 键值名称
 * @param result 修改结果 #{key}
 * @param values 符合键值的内容
 * @param old 旧的数据
 */
interface Key {
    name : string,
    result : string,
    values :Array<string>
}
interface RuleKey {
    name : string,
    exec? :number,
    result? : string
}

class SeiriBox {
    content :string;
    rules : Array<Rule>;
    options :Option;
    keys :Array<Key>
    constructor (content :string){
        this.content = content;
        this.options = {};
        this.rules = [];
        this.keys = [];
    }

    /**
     * 根据正则修改内容
     * @param { string } value 内容
     * @param { RegExp } regexp 正则
     * @param { (validate :boolean ,value:string) => Object } _callback 回掉函数参数为正则是否匹配与值
     * @returns { Object || string } 返回值
     */
    private setLineByExp = (value :string ,regexp :RegExp ,_callback :(validate :boolean ,value:string) => Object) : any => {
        if(regexp instanceof RegExp){
            const validate = regexp.test(value);
            return _callback(validate,value);
        }else{
            return value;
        }
    }

    /**
     * 遍历内容的每行数据
     * @param { string } content 内容
     * @param { (line :string ,idx :number) => string } callback 处理每行数据的回掉函数
     * @returns { Array<string> } 返回处理过后每行的数组
     */
    private LinesMap = ( content :string ,callback :(line:string ,idx :number) => string ) : Array<string> => {
        const regexp = /^.*$/mg
        const old_lines = content.match(regexp);
        const lines =  old_lines ? old_lines.filter(function(line){
            return line != ""
        }) : [];

        return lines.map(callback)
    }

    /**
     * 添加处理规则
     * @param { Rule ,Array<Rule> } rule ;
     * @returns { SeiriBox } 返回this可以点自己
     */
    addRule(rule :any) :SeiriBox {
        if(rule instanceof Array){
            this.rules = this.rules.concat(rule)
        }else if(rule instanceof Object){
            this.rules.push(rule)
        }
        return this;
    }

    /**
     * 根据处理规则获取处理后的内容
     * @param { string } content 原内容
     * @returns { string } 处理后的内容 
     */
    private getNewLineByRule = (content :string ) :string => {
        let pResult :ProcessingResult = { value :content ,revise :false };
        if(this.rules.length > 0){
            this.rules.forEach((rule :Rule,idx :number) :void => {
                if(rule && rule.regexp && rule.value){
                    pResult = this.disposeContent(rule,pResult)
                }
            })
        }   
        return pResult.value;
    }

    /**
     * 根据处理规则与处理状态返回处理结果
     * @param { Rule } rule 处理规则
     * @param { ProcessingResult } past 处理状态
     * @return { ProcessingResult } 处理结果
     */
    private disposeContent = (rule :Rule , past :ProcessingResult) :ProcessingResult => {
        var pResult :ProcessingResult = { revise : past.revise ,value : past.value }
        if(!past.revise){
            return this.setLineByExp(past.value,rule.regexp,(validate :boolean,content :string) => {
                let new_content = content
                if(validate){          
                    new_content = this.ruleInValue().handle(content,rule);
                    this.ruleInKey().handle(rule,content)
                }
                const new_pResult = validate ? { revise :true ,value : new_content } : pResult;
                return new_pResult;
            })
        }else{
            return pResult;
        }
    }

    /**
     * 处理 rule.line 属性问题
     */
    private ruleInValue = () => {
        return {
            handle : (content : string ,rule :Rule) => {
                let result :string = content
                if(rule.line){
                    rule.left = rule.left || ""
                    rule.right = rule.right || ""
                    result = content.replace(rule.regexp,(word :string) => {
                        return rule.value.replace(/\$\{key\}/g,word);
                    })
                    result = rule.left + result + rule.right      
                }else{
                    result = rule.value.replace('${key}',content);
                }
                return result;
            }
        }
    }   

    private ruleInKey = () => {
        return { 
            handle : (rule :Rule,value :string) :void => {
                let rule_key = rule.key || { name : '' }
                if(rule_key && rule_key.name && rule_key.result){
                    this.keys.forEach((key :Key ,idx :number) => {
                        if(key.name == rule_key.name){
                        let exec :Array<string> = rule.regexp.exec(value) || ['']
                            let execIndex = rule_key.exec ? rule_key.exec : 0
                            let newVal = exec[execIndex] || exec[0]
                            key.values = unique(key.values.concat(newVal));
                            key.result = rule_key.result || ''
                        }
                    })
                    // console.log(this.keys.values)
                }
            },
            init : () => {
                let keys :Array<Key> = [];
                this.rules.forEach((rule :Rule) :void => {
                    if(rule.key && rule.key.name && rule.key.result){
                        let key :Key = { name :rule.key.name ,values : [], result : rule.key.result }
                        keys.push(key)
                    }
                })
                this.keys = keys;
            },
            end : (content :string) : string => {
                this.keys.forEach((key :Key) => {
                    if(key.result){
                        key.values.forEach((val : string) => {
                            const reg = RegExp(val,'g')
                            const oldContent = content.replace(reg,key.result);
                            content = oldContent.replace(/\$\{key\}/g,val);
                        })
                    }
                });
                return content;
            }    
        }
    }

    ruleRuleTYPE = () => {
        let rules :Array<Rule> = [ ]
        switch (this.options.type){
            case 'episodes' :
                rules = [
                    {regexp : /^第\d+集$/ , value :'# ${key}' },
                    {regexp : /^\d+[-]\d+[,.:].{0,10}$/ , value :'  \n---  \n## ${key}'},
                    {regexp : /^(场景|人物|时间)[-:,.：]/ , value :'`${key}`'   },
                  ]
                this.addRule(rules)
            break;
            case 'biography' :
                rules = [
                    { regexp:/^(.{1,5})([\(\[【（].{0,10}[\)）】\]])?[.:：]$/ ,value:'# ${key}' ,key: { name:'renwu' ,exec :1 ,result :'`${key}`' } }
                ]
                this.addRule(rules)
            break;
        }
    }

    init = ( ) => {
        this.ruleRuleTYPE();
        this.ruleInKey().init();
    }

    /**
     * 是否去除空格
     * @param { string } 内容
     * @param { type } 可选left , right 。去除左空格右空格或左右空格
     * @returns { string } 修改后内容
     */
    private trim = (str :string,type? :string) :string => {
        let newStr :string = str;
        switch (type){
            case 'right' :
                newStr = str.replace(/(\s*$)/g, "");
            break;
            case 'left' :
                newStr = str.replace(/(^\s*)/g, "");
            break;
            default :
                newStr = str.replace(/(^\s*)|(\s*$)/g, "")
            break;
        }
        return newStr;
    }

    /**
     * 添加配置信息
     * @param { Option } 配置信息
     * @returns { SeirBox } 返回本身
     */
    setOption = (option : Option) :SeiriBox => {
        this.options = Object.assign(this.options,option)
        return this;
    }

    /**
     * 获取内容的行数组
     * @returns { Array<string> } 返回行数组。
     */
    getLines = () :Array<string> => {
        if(this.content == null || this.content == '' || typeof this.content !== 'string' ){
            return [];
        }else{
            this.init();
            return this.LinesMap(this.content ,(line :string) => {
                let newLine = line;
                if(this.options.trim){
                    newLine = this.trim(line)
                }
                return this.getNewLineByRule(newLine);
            })
        }
    }

    /**
     * 获取处理后内容
     * @returns { string } 处理过后内容
     */
    getContent = () :string => {
        let content = this.getLines();
        let newContent = this.options.br ? content.join("  \n") : content.join()
        if(this.keys.length > 0 ){
            return this.ruleInKey().end(newContent);
        }else{
            
            return newContent
        }
    }
}

export default SeiriBox 
export { Rule ,Option }


//数组去重
const unique = (a : Array<any>) => {
    var hash = {},
        len = a.length,
        result = [];
   
    for (var i = 0; i < len; i++){
        if (!hash[a[i]]){
            hash[a[i]] = true;
            result.push(a[i]);
        } 
    }
    return result;
}


   