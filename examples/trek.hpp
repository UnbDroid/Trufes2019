#include <iostream>
#include <stdint.h>
#include <cstring>

using namespace std;

extern "C"
{
#include <rc/uart.h>
#include <rc/start_stop.h>
}

#define TIMEOUT_S 0.5
#define BAUDRATE 115200

void* send_pwm(void *pwm);