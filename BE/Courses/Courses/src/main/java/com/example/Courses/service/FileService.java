package com.example.Courses.service;

import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.List;

public interface FileService {
  // Tạo folder
    public void createFolder(String folder) throws URISyntaxException;

    // Tạo và lưu file
    public String storeFile(MultipartFile file, String folder) throws URISyntaxException;
    // Hàm lấy độ dài file
  public long getFileSize(String fileName, String folder) throws URISyntaxException;
//   Lấy file theo tên và folder trả về luồng
  public InputStreamResource getFileInputStream(String fileName, String folder) throws URISyntaxException, FileNotFoundException;
  // Fetch list file in a folder
  public List<String> listFiles(String folder) throws URISyntaxException, IOException;
  // Delete File

}
