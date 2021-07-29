package com.example.hello

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.GetMapping

@SpringBootApplication
class HelloApplication

fun main(args: Array<String>) {
	runApplication<HelloApplication>(*args)
}

@RestController
class HelloController {

	@GetMapping("/ping-kotlin")
	fun hello() = mapOf("message" to "pong-kotlin")

}
