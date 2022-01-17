
int melody[] = {
  523, 466, 440, 349,
  392, 0, 392, 587,
  523, 0, 466, 0,
  440, 0, 440, 440,
  523, 0, 466, 440, 
  392,0, 392, 932,
  880, 932, 880, 932,
  392,0, 392, 932,
  880, 932, 880, 932,
  392, 0, 392, 587,
  523, 0, 466, 0,
  440, 0, 440, 440,
  523, 0, 466, 440, 
  392,0, 392, 932,
  880, 932, 880, 932,
 };


void setup () {
  for (int noteIndex = 0; noteIndex < 60; noteIndex++) {

    int noteLength = 750 / 4;
    tone(A0, melody[noteIndex], noteLength);

    int pauseBetweenNotes = noteLength * 1.3;
    delay(pauseBetweenNotes);
    
    noTone(A0);
 }
}
void loop () { };