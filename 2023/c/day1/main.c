#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *readFile(char *fileName) {
  FILE *fptr;
  char *buffer;
  long file_size;
  size_t result;

  // Open in binary mode to get the file size accurately
  fptr = fopen("input.txt", "rb");

  if (fptr == NULL) {
    printf("Error opening file. \n");
    return NULL;
  }

  fseek(fptr, 0, SEEK_END); // move file pointer to the end of the file
  file_size =
      ftell(fptr); // get current position of fptr, which is the file size
  rewind(fptr);    // move fptr to beginning of file

  // allocate memory for the buffer
  // the plus 1 byte is to account for the EOF null terminator
  buffer = (char *)malloc(file_size + 1);

  if (buffer == NULL) {
    printf("Error allocating memory. \n");
    fclose(fptr);
    return NULL;
  }

  result = fread(buffer, 1, file_size, fptr);

  if (result != file_size) {
    printf("Error reading the file.\n");
    free(buffer);
    fclose(fptr);
    return NULL;
  }

  // add null terminator at the end of the buffer
  buffer[file_size] = '\0';

  fclose(fptr);
  return buffer;
}

char **splitLines(const char *buffer, int *num_lines) {
  const char *start = buffer;
  const char *end;
  int count = 0;

  // Count the number of lines
  while (*start != '\0') {
    count++;
    end = strchr(start, '\n');
    if (end == NULL)
      break;
    start = end + 1;
  }

  // Allocate memory for the array of strings
  char **lines = (char **)malloc(count * sizeof(char *));
  if (lines == NULL) {
    printf("Memory allocation failed.\n");
    *num_lines = 0;
    return NULL;
  }

  // Copy each line into the array
  start = buffer;
  for (int i = 0; i < count; i++) {
    end = strchr(start, '\n');
    if (end == NULL) {
      end = start + strlen(start);
    }
    size_t length = end - start;
    lines[i] = (char *)malloc((length + 1) * sizeof(char));
    if (lines[i] == NULL) {
      printf("Memory allocation failed.\n");
      *num_lines = i; // Partially allocated lines
      // Free memory allocated so far
      for (int j = 0; j < i; j++) {
        free(lines[j]);
      }
      free(lines);
      return NULL;
    }
    strncpy(lines[i], start, length);
    lines[i][length] = '\0';
    start = end + 1;
  }

  *num_lines = count;
  return lines;
}

void freeLines(char **lines, int numLines) {
  if (lines != NULL) {
    for (int i = 0; i < numLines; i++) {
      free(lines[i]);
    }
    free(lines);
  }
}

int main() {
  char *file = readFile("input.txt");
  if (file == NULL) {
    printf("There was an error reading the file.\n");
    free(file);
    return 1;
  }

  int numLines;
  char **lines = splitLines(file, &numLines);

  if (lines == NULL) {
    printf("There was an error splitting the file contents.\n");
    free(file);
    free(lines);
    return 1;
  }

  // we can free file now since lines is made
  free(file);

  for (int i = 0; i < numLines; i++) {
    printf("Line %d: %s\n", i + 1, lines[i]);
  }

  // loop through the lines

  //

  freeLines(lines, numLines);
  return 0;
}
