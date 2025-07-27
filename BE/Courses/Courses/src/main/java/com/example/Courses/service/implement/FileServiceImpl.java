package com.example.Courses.service.implement;

import com.example.Courses.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FileServiceImpl  implements FileService {
    private final String baseURI;
    public FileServiceImpl(
            @Value("${phachnguyen.upload-file.base-uri}")
            String baseURI
    ) {
        this.baseURI = baseURI;
            }

    @Override
    public void createFolder(String folder) throws URISyntaxException {
        URI uri = new URI(folder); // init
        Path path = Paths.get(uri); // Tạo đường dẫn
        if (!Files.exists(path)) {

        }
//         tmpDir : temporary  Directory : thu mục tạm thời
        File tmpDir = new File(path.toString()); // Init sang String
        if(!tmpDir.isDirectory()) {
            try {
                Files.createDirectory(tmpDir.toPath());
                System.out.println("Init folder: " + tmpDir.getAbsolutePath());

            }catch (IOException e){
                e.printStackTrace();
            }
        }else {
            System.out.println("Folder already exists: " + tmpDir.getAbsolutePath());
        }

        }

// Hàm tạo file và lưu file
@Override
public String storeFile(MultipartFile file, String folder) throws URISyntaxException {
    // Tạo tên file duy nhất
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    // Ghép baseUri + folder (nếu có) + fileName
    String fullUri = baseURI + (folder != null ? folder + "/" : "") + fileName;
    // Tạo URI và Path
    URI uri = new URI(fullUri);
    Path path = Paths.get(uri);
    try {
        // Đảm bảo thư mục cha tồn tại
        Files.createDirectories(path.getParent());
        // Lưu file
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
        }
    } catch (IOException e) {
        e.printStackTrace();
        throw new RuntimeException("Lỗi khi lưu file: " + e.getMessage());
    }

    return fileName;
}

    @Override
    public long getFileSize(String fileName, String folder) throws URISyntaxException {
    URI uri = new URI(baseURI + (folder != null ? folder + "/" : "") + fileName); // Tạo đường dẫn tới file ảnh
    Path path = Paths.get(uri); // Convert URI sang Path : đại diện đường dẫn cho file
        File tmpDir = new File(path.toString());
//         Check nếu file k tồn tại, hoặc File là một folder
        if(!tmpDir.exists() || tmpDir.isDirectory()) {
            return 0;
        }
        return tmpDir.length();
    }

    @Override
    public InputStreamResource getFileInputStream(String fileName, String folder) throws URISyntaxException, FileNotFoundException {
        URI uri = new URI(baseURI + (folder != null ? folder + "/" : "") + fileName);
        Path path = Paths.get(uri);
        File tmpDir = new File(path.toString());
        return new InputStreamResource(new FileInputStream(tmpDir));
    }

    @Override
    public List<String> listFiles(String folder) throws URISyntaxException,IOException {
        URI uri = new URI(baseURI + (folder != null ? folder + "/" : ""));
        Path path = Paths.get(uri);
        File dir = new File(path.toString());
        if (!dir.exists() || !dir.isDirectory()) {
            throw new IOException("Folder does not exist or is not a directory");
        }
        File[] files = dir.listFiles();
        if (files == null) {
            throw new IOException("Failed to list files");
        }
return Arrays.stream(files)
        .filter(File :: isFile) // method reference
        .map(File :: getName)
        .sorted() // Sắp xếp theo thời gian
        .toList() ; // Trả kết quả về List


    }


}
