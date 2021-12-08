
class Figura {
    constructor(x,y,color)
    {
        this.x = x;
        this.y = y;
        this.color = color;
       
    }
}

class Bola extends Figura 
{
 constructor(x,y,color,radio,velocidad=7,velocidad_x=5,velocidad_y=5)
 {
     super(x,y,color)
     this.radio = radio;
     this.velocidad=velocidad;
     this.velocidad_x = velocidad_x;
     this.velocidad_y = velocidad_y;
 }

 reiniciar()
 {
     this.x = largo/2;
     this.y = ancho/2;
     this.velocidad_x = -this.velocidad_x;
     this.velocidad = 7; 
 }

 colision()
    {
        let arriba_jugador_1 = Jugador_1.y;
        let abajo_jugador_1 = Jugador_1.y + Jugador_1.ancho;
        let izquierda_jugador_1 = Jugador_1.x;
        let derecha_jugador_1 = Jugador_1.x ;
        
        let arriba_jugador_2 = Jugador_2.y;
        let abajo_jugador_2 = Jugador_2.y ;
        let izquierda_jugador_2 = Jugador_2.x;
        let derecha_jugador_2 = Jugador_2.x + Jugador_2.largo;

        let arriba_bola = this.y - this.radio;
        let abajo_bola = this.y + this.radio;
        let izquierda_bola = this.x - this.radio;
        let derecha_bola = this.x + this.radio;

        return (izquierda_jugador_1 < derecha_bola && arriba_jugador_1 < abajo_bola && derecha_jugador_1 > izquierda_bola && abajo_jugador_1 > arriba_bola) || (izquierda_jugador_2 < derecha_bola && arriba_jugador_2 < abajo_bola && derecha_jugador_2 > izquierda_bola && abajo_jugador_2 > arriba_bola );    
    }

     mover()
     {
        this.x += this.velocidad_x;
        this.y += this.velocidad_y;

        if(this.y + this.radio/2 > ancho || this.y - this.radio/2 < 0)
        {
            this.velocidad_y = -this.velocidad_y;
        }
     }

     crear()
     {
        this.rebotar();
        this.mover();
        
        circle(this.x,this.y,this.radio);
     }

     punto()
     {
            if(bola.x == 0 || bola.x < 0)
            {
                Jugador_2.puntuacion++;
                this.reiniciar();
            }

            else if(bola.x  == largo || bola.x > largo)
            {
                Jugador_1.puntuacion++;
                this.reiniciar();
            } 
     }

     rebotar()
     {
            if(this.colision())
            {
                if (this.x < largo/2 )
                {
                    punto_choque = this.y - (Jugador_1.y + Jugador_1.largo/2);
                    punto_choque = punto_choque / (largo_jugador/2);
                    let angulo = (Math.PI/4) * punto_choque;
    
                    if (this.x  < ancho/2)
                    {
                        direccion = 1;
                    } 
                    else if (this.x  > ancho/2 )
                    {
                        direccion= -1; 
                    }
                    this.velocidad_x = direccion * this.velocidad * Math.cos(angulo);
                    this.velocidad_y = this.velocidad * Math.sin(angulo);
    
                    console.log("choco jugador 1");
                }
    
                else if(this.x > largo/2)
                {

                    punto_choque = this.y - (Jugador_2.y + Jugador_2.largo/2);
                    punto_choque = punto_choque / (largo_jugador/2);
                    let angulo = (Math.PI/4) * punto_choque;
                    
                    if (this.x  < ancho/2)
                    {
                        direccion = 1;
                    } 
                    else
                    {
                        direccion= -1;
                    }
                    this.velocidad_x = direccion * this.velocidad * Math.cos(angulo);
                    this.velocidad_y = this.velocidad * Math.sin(angulo);
                    console.log("choco jugador 2");
                }
            } 
        }
}

let direccion = 0;
let punto_choque = 0;
class Jugador extends Figura 
{
    constructor(x,y,color,nombre,ancho,largo,puntuacion = 0)
    {
        super(x,y,color)
        this.nombre = nombre;
        this.ancho= ancho;
        this.largo = largo;
        this.puntuacion=puntuacion;
    }
    colision()
    {
        let arriba_jugador = this.y;
        let abajo_jugador = this.y + largo_jugador;
        if(arriba_jugador == 0)
        {
            return true;

        } 
        else if(abajo_jugador == ancho)
        {
            return true;
        }

    }
    mover()
    { 
        if((Jugador_1.colision() && Jugador_1.y > ancho/2))
        {
            Jugador_1.y -= dy;
        } 
        else if ( Jugador_1.colision() && Jugador_1.y < ancho/2)
        {
            Jugador_1.y += dy;    
        }
        else if((Jugador_2.colision() && Jugador_2.y > ancho/2))
        {
            Jugador_2.y -= dy;
        } 
        else if ( Jugador_2.colision() && Jugador_2.y < ancho/2)
        {
            Jugador_2.y += dy;    
        }
        else
        {
            //jugador 1 
            if(keyIsDown(87))
            { 
                Jugador_1.y -= dy;
            } 
            else if(keyIsDown(83))
            {
                Jugador_1.y += dy;
            }
            //jugador 2 
            else if(keyIsDown(76))
            {
                Jugador_2.y += dy;       
            }
            else if(keyIsDown(79))
            { 
                Jugador_2.y -= dy;     
            }
        } 
          
    }

    crear()
    {
        this.mover();
        this.colision();
        rect(this.x,this.y,this.ancho,this.largo);
    }

}
    

    //Especificacion de dimesiones
    let largo = 1200;
    let ancho =800; 

    let ancho_jugador = 40;
    let largo_jugador = 140;
    let radio_bola = 50;

    // Velocidad 
    let segundos = 0;
    let dy = 10;
    let velociad_bola = 0;

    //Inicialicacion de objetos de clase Jugador
    let Jugador_1 = new Jugador(largo - 1150,ancho - 500,"white","Jugador_1",ancho_jugador,largo_jugador);
    let Jugador_2 = new Jugador(largo - 90,ancho - 500,"white","Jugador_2",ancho_jugador,largo_jugador);
    let bola = new Bola(largo/2,ancho/2,"white",radio_bola);
    
    

    function imprimir(nombre_1,score_1,nombre_2,score_2){
        textSize(32);
        text(nombre_1, largo/15, ancho/14);
        text(score_1,130,90);
        text(nombre_2,largo - largo/5, ancho/14);
        text(score_2,largo -180,90);
    }

    function setup() 
    {
        createCanvas(largo, ancho); 
        noCursor();
    }

    function draw() 
    {
        background("#162756");
        Jugador_1.crear();
        Jugador_2.crear();
        bola.crear();
        bola.punto();
        print(bola.x)
        imprimir(Jugador_1.nombre,Jugador_1.puntuacion,Jugador_2.nombre,Jugador_2.puntuacion);
    }