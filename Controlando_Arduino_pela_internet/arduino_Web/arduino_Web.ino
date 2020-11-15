const int temp = A0;
const int led1 = 4;
int valor = 0;

void setup() {
  Serial.begin(9600);
  pinMode(led1, OUTPUT);
}

void loop() {
  valor = analogRead(temp);
  Serial.println(valor);

  if(Serial.available()){
    switch(Serial.read()){
      case 'a':
      digitalWrite(led1, HIGH);
      break;

      case 'b':
      digitalWrite(led1, LOW);
      break;
    }
   delay(4000);
  }
}
