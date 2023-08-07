Swagger标准

``` json
{
    "swagger"： "版本",
    "info": {
        "title": "团队名称",
        "version": "版本",
        "description": "介绍",
    },
    "tags": {
        {
            "name": "项目名称",
            "description": "介绍"
        }
    },
    "paths": {
        "/path": {
            "GET"：{
                "summary": "总结描述",
                "tags": [],
                "parameters": [
                     {
                        "name": "ccc",
                        "in": "cookie|query|header",
                        "description": "",
                        "required": false,
                        "example": "123",
                        "schema": {
                          "type": "string"
                        }
                     },
                                     {
                        "name": "ccc",
                        "in": "cookie|query|header|body",
                        "description": "",
                        "required": false,
                        "example": "123",
                        "schema": {
                          "type": "string"
                        }
                     },
                
                ]
            },
            "POST": {}
        },
        
        
    }

}
```