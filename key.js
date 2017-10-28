class key
{
    constructor(letter,row, delay)
    {
        var _this = this;

        this.delay = delay;
        this.letter = letter;
        this.h1 = document.createElement("h1");
        this.h1.className = "key";
        this.h1.textContent = letter;
    
        row.append(this.h1);

        //this.press();
    }
    
    press(word)
    {
        $(this.h1).stop();

        $("#display").text(word);        

        this.h1.style.color = "black";

        $(this.h1).animate({
            color: "white"
        }, this.delay); 
    }

}