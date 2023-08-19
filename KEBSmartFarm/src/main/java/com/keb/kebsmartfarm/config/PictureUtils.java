package com.keb.kebsmartfarm.config;

import org.springframework.http.MediaType;

public class PictureUtils {
    public static String getFileExtension(String fileName) {
        String[] nameAndExt = fileName.split("\\.");
        return nameAndExt[nameAndExt.length - 1];
    }

    public static MediaType getMediaTypeForExtension(String extension) {
        return switch (extension.toLowerCase()) {
            case "png" -> MediaType.IMAGE_PNG;
            case "gif" -> MediaType.IMAGE_GIF;
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            default -> throw new IllegalStateException("Unexpected value: " + extension.toLowerCase());
        };
    }
}
