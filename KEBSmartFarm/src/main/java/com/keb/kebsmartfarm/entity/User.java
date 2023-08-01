package com.keb.kebsmartfarm.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MemberSeqNum;

    @Column(length = 3)
    private String userName;

    @Column(length = 10, unique = true)
    private String userId;

    @Column(nullable = false)
    private String userPassword;
    @Column(length = 13)
    private String userPhoneNum;

    @Column(nullable = false, unique = true)
    private String userEmail;

    private String userNickname;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ArduinoKit> arduinoKitList;

    private Authority authority;
    // userPassword와 userNickname은 변경 가능
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }
    @Builder
    public User(Long memberSeqNum, String userName, String userId, String userPassword, String userPhoneNum, String userEmail, String userNickname, Authority authority, List<ArduinoKit> arduinoKitList) {
        MemberSeqNum = memberSeqNum;
        this.userName = userName;
        this.userId = userId;
        this.userPassword = userPassword;
        this.userPhoneNum = userPhoneNum;
        this.userEmail = userEmail;
        this.userNickname = userNickname;
        this.authority = authority;
        this.arduinoKitList = arduinoKitList;
    }
}
