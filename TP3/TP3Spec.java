package TP3;

import static org.junit.jupiter.api.Assertions.*;
import java.util.NoSuchElementException;

import java.util.Iterator;
import java.util.ListIterator;

public class TP3Spec<Item> {
	Queue queue = new Queue();
	
	@org.junit.jupiter.api.BeforeEach
    void setUp() {
		this.queue = new Queue();	
    }
	
	 @org.junit.jupiter.api.Test
	 void trancheFirstSeq1() {
	 
		 assertEquals(this.queue.isEmpty(), true);
		 this.queue.enqueue(5);
		 this.queue.enqueue(6);
		 assertEquals(this.queue.peek(), 5);
		 this.queue.dequeue();
		 this.queue.dequeue();
		 assertEquals(this.queue.isEmpty(), true);
		 assertEquals(this.queue.toString(), "");
		 assertEquals(this.queue.iterator().hasNext(), false);
     
	 }
	 
	 @org.junit.jupiter.api.Test
	 void trancheFirstSeq2() {
	 
		 assertEquals(this.queue.isEmpty(), true);
		 
		 Throwable queueUnderflow = assertThrows(NoSuchElementException.class,() -> {
			 this.queue.dequeue();
		 });
		 Throwable queueEmptyPeek = assertThrows(NoSuchElementException.class,() -> {
			 this.queue.peek();
		 });
		 assertEquals(this.queue.getFirst(), null);
		 this.queue.enqueue(5);
		 assertEquals(this.queue.isEmpty(), false);
		 assertEquals(this.queue.toString(), "5 ");
		 assertEquals(this.queue.iterator().hasNext(), true);
     
	 } 
	 
	 @org.junit.jupiter.api.Test
	 void trancheLastSeq1() {
		 
		 this.queue.enqueue(5);
		 assertEquals(this.queue.getLast(), "5");
		 this.queue.dequeue();
		 assertEquals(this.queue.getLast(), null);
		 assertEquals(this.queue.toString(), "");
     
	 }
	 
	 @org.junit.jupiter.api.Test
	 void trancheLastSeq2() {
		 
		 Throwable queueUnderflow = assertThrows(NoSuchElementException.class,() -> {
			 this.queue.dequeue();
		 });
		 assertEquals(this.queue.getLast(), null);
		 this.queue.enqueue(5);
		 assertEquals(this.queue.getLast(), "5");
		 assertEquals(this.queue.toString(), "5 ");
     
	 }
	 
	 @org.junit.jupiter.api.Test
	 void trancheNSeq1() {
		 
		 assertEquals(this.queue.size(), 0);
		 this.queue.enqueue(5);
		 assertEquals(this.queue.size(), 1);
		 this.queue.dequeue();
		 assertEquals(this.queue.size(), 0);
		 assertEquals(this.queue.toString(), "");
	 }
	 
	 @org.junit.jupiter.api.Test
	 void trancheNSeq2() {
		 
		 assertEquals(this.queue.size(), 0);
		 Throwable queueUnderflow = assertThrows(NoSuchElementException.class,() -> {
			 this.queue.dequeue();
		 });
		 assertEquals(this.queue.size(), 0);
		 this.queue.enqueue(5);
		 assertEquals(this.queue.size(), 1);
		 assertEquals(this.queue.toString(), "5 ");
	 }
	 
	 

}
