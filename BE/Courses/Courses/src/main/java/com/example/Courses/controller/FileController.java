package com.example.Courses.controller;

import com.example.Courses.Util.annotation.ApiMessage;
import com.example.Courses.Util.error.StorageExecption;
import com.example.Courses.domain.response.file.ResUpLoadFileDTO;
import com.example.Courses.service.FileService;
import com.example.Courses.service.implement.FileServiceImpl;
import com.example.Courses.service.implement.QuizServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Value("${phachnguyen.upload-file.base-uri}")
    private String baseUri;
    private final FileService fileService;

  public FileController(FileService fileService) {
      this.fileService = fileService;
  }

  @PostMapping
    @ApiMessage("Upload singer file")
    public ResponseEntity<ResUpLoadFileDTO> createQuestion(
          @RequestParam(name = "file", required = false)MultipartFile file,
          @RequestParam(name = "folder") String folder
          ) throws IOException, URISyntaxException, StorageExecption {
      if(file == null || file.isEmpty()){
          throw  new StorageExecption("File is null or empty");
      }
      String fileName = file.getOriginalFilename();
      List<String> allowedFile = Arrays.asList("pdf","jpg","png","doc","docx");
//       Dùng stream trong collection để filter,map,sorted,count,foreach mà k thay đổi collection gốc
      boolean isValid = allowedFile.stream().anyMatch(item -> fileName.toLowerCase().endsWith(item));
      if(!isValid){
          throw new StorageExecption("File is not valid");
      }
      // Init file if not exist
      this.fileService.createFolder(baseUri + folder);
//       Store file
      String upLoadFile = this.fileService.storeFile(file, folder);
      ResUpLoadFileDTO dto = new ResUpLoadFileDTO(upLoadFile, Instant.now());
      return ResponseEntity.ok().body(dto);

  }

   @GetMapping
    @ApiMessage("Dowload file ")
    public ResponseEntity<?> dowLoadFile(
            @RequestParam(name = "folder") String folder,
            @RequestParam(name = "file") String file)
   throws IOException, URISyntaxException, StorageExecption {
      if(file == null || folder==null){
          throw new StorageExecption("Missing required params : (fileName or folder) in query params.");
      }
      // Check file exist ( and not exist folder )
       long fileLenght =this.fileService.getFileSize(file, folder);
      if(fileLenght == 0){
          throw  new StorageExecption("File " + file + " not found");
      }
      // Dowload
       InputStreamResource dowload = this.fileService.getFileInputStream(file, folder);
      return ResponseEntity.ok().body(dowload);
   }
   @GetMapping("/list")
    @ApiMessage("Fetch all files in folder ")
    public ResponseEntity<?> listFile(@RequestParam(name="folder") String folder)
   throws IOException, URISyntaxException, StorageExecption {
       List<String> files = fileService.listFiles(folder);
       return ResponseEntity.ok(files);
   }


}
