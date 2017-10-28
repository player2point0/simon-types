var speed = 200;
var keys = [];
var random = false;
var words = [];
var count;
var currentWord;
var i;
var TypeWord;

$(document).ready(function(){

    //Makes an array of keys made up of three rows
    keys = PlaceKeys(["q","w","e","r","t","y","u","i","o","p"], speed).concat(PlaceKeys(["a","s","d","f","g","h","j","k","l"], speed).concat(PlaceKeys(["z","x","c","v","b","n","m"], speed )));

    TypeWord = function(words, letters, delay)
    {
        $("#display").css("color","red");//change color

        if(letters.length == 0)//check if out of letters
        {
            words.shift();//remove word            

            if(words.length == 0)//check if out of words
            {
                currentWord = "";
                return;
            }

            setTimeout(TypeWord, delay, words, words[0].split(""), delay );
            currentWord = "";
            return;
        }

        currentWord += letters[0];

        key = GetKey(letters[0]);

        if(key == null) return;//return if key doesn't exist

        key.press(currentWord);

        letters.shift();//remove letter

        setTimeout(TypeWord, delay, words, letters, delay);
    }

    Load();  

    $("#random").click(function(){
        random = !random;
        Load();
    });

    function PlaceKeys(arr, delay)
    {
        row = document.createElement("div");
        row.className = "row";

        output = [];

        for(var i = 0;i<arr.length;i++)
        {
            output[i] = new key(arr[i],row, delay);//create a new keya and add it to the row
        }

        $("#keyboard").append(row);//add row to the keyboard

        return output;
    }

    addEventListener("keydown",function(e)
    {
        //CAN DELETE THE COMPUTER'S TEXT TOO
        if(e.key == "Backspace")
        {
            currentWord = currentWord.slice(currentWord.length-2, currentWord.length-1);//remove last char
            $("#display").text(currentWord);//update display
            return;
        }

        $("#display").css("color","black");//change display color
        letter = e.key.toLowerCase();//keep all chars lowercase

        if(letter.length > 1) return;//return if it is not a letter

        currentWord += letter;
        GetKey(letter).press(currentWord);

        if(currentWord.length == words[i].length)
        {
            //check word
            if(currentWord == words[i])
            {
                i++;//move onto next word
                currentWord = "";
                
                if(i == count)//check if at end of words
                {
                    count++;
                    i = 0;
                    TypeWord(words.slice(0,count), words[0].split(""), speed);                
                }
            }

            else
            {
                $("#display").text("fail");    
                setTimeout(Load, 400);//reload            
            } 
        }
    });

    function GetKey(letter)
    {
        for(var i = 0;i<keys.length;i++)
        {
            if(keys[i].letter == letter) return keys[i];//loop through keys and return key
        }
    }  
});

function Load()
{
    //Default sentence
    words = ["you","have","part","of","my","attention","you","have","the","minimum","amount"];

    if(random)
    {
        words = [];//reset array

        words = GetRandomWords(3, start);//get words
    }

    else start(words);

    function GetRandomWords(num, callback, arr)
    {        
        if(arr == null) arr = [];//allows the arr to passed around

        $.ajax({
			url: "https://setgetgo.com/randomword/get.php",
			dataType: "jsonp",
            
            success: function(response)
            {
                arr.push(response.Word);//add to array
            },

            complete: function(){
                num--;//decrease counter

                if(num == 0) 
                {
                    callback(arr);//call function and pass in arr
                    return;
                }

                GetRandomWords(num, callback, arr);//call self to build up arr
            }
		});
    }
   
    function start(arr)//allows TypeWord to be called from the api function
    {
        count = 1;
        i = 0;
        currentWord = "";

        words = arr;
        TypeWord(words.slice(0,count), words[0].split(""), speed);  
    }
}