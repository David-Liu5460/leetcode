function template(tmplStr, data) {
    //
    }
    
    template(`Hello, <%=name%>, I am a <%=role %> > <% if (name === 'a') { %><% } %>`, {name: 'stephen', role: 'engineer'}) 
    // Hello, stephen, I am a engineer
    
    // 作者：lllbbbwww
    // 链接：https://www.nowcoder.com/discuss/353158256992395264?sourceSSR=search
    // 来源：牛客网
    