int ldr = A0;
int valor = 0;
int led = 53;

void setup() {
  Serial.begin(9600); //quanto mais luz, menor o valor da resistência
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  valor = analogRead(ldr); //valor de 0 a 1023
  //valor = map(valor, 0, 1023, 0, 255);
  Serial.println(valor);
  delay(300);

}
