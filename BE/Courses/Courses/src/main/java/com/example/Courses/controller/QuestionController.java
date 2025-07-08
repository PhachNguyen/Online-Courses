//package com.example.Courses.Controller;
//
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/v1/questions")
//@CrossOrigin("*")
//public class QuestionController {
//
//    @Autowired
//    private QuestionService questionService;
//
//    @GetMapping
//    public ResponseEntity<List<Question>> getAllQuestions() {
//        return ResponseEntity.ok(questionService.getAllQuestions());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
//        return questionService.getQuestionById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
//        return ResponseEntity.ok(questionService.createQuestion(question));
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
//        Question updated = questionService.updateQuestion(id, question);
//        if (updated == null) return ResponseEntity.notFound().build();
//        return ResponseEntity.ok(updated);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
//        questionService.deleteQuestion(id);
//        return ResponseEntity.noContent().build();
//    }
//}