#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(void) {
    for (int i = 0; i < 3; i++) {
        printf("iteration No :- %d\n", i);
        int pid;
        pid = fork();
        if (pid < 0) {
            perror("fork");
            exit(1);
        }
        if (pid == 0) {
            puts("This is the child process");
        } else {
            puts("This is the parent process");
        }
    }
    return 0;
}
