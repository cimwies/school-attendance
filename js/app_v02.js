/* Model */
let Model = {
    numDay : 12,
    students : [
        {
            name : 'Slappy the Frog',
            checklist : [],
            missDate: 0
        },
        {
            name : 'Lilly the Lizard',
            checklist : [],
            missDate: 0
        },
        {
            name : 'Paulrus the Walrus',
            checklist : [],
            missDate: 0
        }, 
        {
            name : 'Gregory the Goat',
            checklist : [],
            missDate: 0
        },  
        {
            name : 'Adam the Anaconda',
            checklist : [],
            missDate: 0
        }                    
    ], // end students

    genList: function(c) {
        let list=[];
        for (let i=1; i<=c; i++) {
            let ranNum = Math.round(Math.random());
            list.push(ranNum);
        };
        return list;
    } // end genList
};


/* Octopus */
let octopus = {

    getDates: function() {
        return Model.numDay;
    },


    getStudents: function() {
        return Model.students;
    },


    checkornot: function(c) {
        if ( c == 0 ) {
            return " ";
        } else {
            return "checked";
        }
    },


    resetStudent: function(i,j) {
        if (Model.students[i].checklist[j] == 0) {
            Model.students[i].checklist[j]=1;
            Model.students[i].missDate--;
        } else { 
            Model.students[i].checklist[j]=0; 
            Model.students[i].missDate++;
        }
    },


    assignList: function() {
        for (let i = 0; i < Model.students.length;i++) {
            let list = Model.genList(Model.numDay);
            let missDate = 0;
            for (let j = 0; j < Model.numDay; j++) {
                if (list[j] == 0) {
                    missDate++;
                }
            }; // end forloop
            Model.students[i].checklist = list;
            Model.students[i].missDate = missDate;
        }; //end forloop
    }, // end assignList

    init: function() {
        this.assignList();
        dateView.init();
        studentView.init();
    }
};


/* View */
let dateView = {
    init: function() {
        this.render();
    }, //end init


    render: function() {
        numDate = octopus.getDates();
        for (let i = numDate; i >= 1; i--) {
        $('#student-name').after('<th>'+i+'</th>');
    }; //end forloop
    } //end render
}; // end dateView


let studentView = {
    init: function() {
        //remove all child nodes of tbody element
        $('tbody').empty();
        this.render();
    }, //end init


    render: function() {
        students = octopus.getStudents();
        numDate = octopus.getDates();
        for (let i=0; i<students.length;i++) {
            $('tbody').append('<tr class="student" id=s'+i.toString()+'>'+'</tr>');
            $('.student:last').append('<td class="name-col">'+students[i].name+'</td>');
            for (let j=0; j<numDate; j++) {
                let ck = octopus.checkornot(students[i].checklist[j]);
                let dayId = i*numDate+j;
                $('#s'+i.toString()).append('<td class="attend-col">'+'<input type="checkbox" id='+dayId.toString()+" "+ck+'>'+'</td>');
                //add event lisenter to each checkout 
                $('#'+dayId.toString()).click((function(icopy,jcopy) {   
                    return function() {
                        //update the model when a clickbox is checked
                        octopus.resetStudent(icopy,jcopy);
                        studentView.init();
                    };
                })(i,j));
            };
            $('.attend-col:last').after('<td class="missed-col">'+students[i].missDate+'</td>')
        };
    }// end render
}; // end studentView


octopus.init();