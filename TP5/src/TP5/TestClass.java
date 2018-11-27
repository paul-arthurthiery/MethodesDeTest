package TP5;

import org.junit.Test;
import TP5.MyList.Elem;
import TP5.SetCalculator;
import static org.junit.Assert.*;


import java.io.IOException;
import java.util.ArrayList;

public class TestClass {
    /*@Test
    public void TestElem() {
        ArrayList testArrayList= new ArrayList();
        Elem testElem = new Elem(testArrayList, null);
        assertEquals(testElem.getContent(), testArrayList);
        assertEquals(testElem.getNext(), null);
        Elem nextElem = new Elem(testArrayList, null);
        testElem.setNext(nextElem);
        assertEquals(testElem.getNext(), nextElem);
        ArrayList newArrayList = new ArrayList();
        testElem.setContent(newArrayList);
        assertEquals(testElem.getContent(), newArrayList);
    }*/

    @Test
    public void TestSetCalculator() {
        ArrayList<Object> arrayListA = new ArrayList<>();
        ArrayList<Object> arrayListB = new ArrayList<>();
        ArrayList<Object> emptyList = new ArrayList<>();
        ArrayList<Object> fullList = new ArrayList<>();
        ArrayList<Object> falseList = new ArrayList<>();
        SetCalculator calculator = new SetCalculator();
        arrayListA.add(1);
        arrayListA.add(2);
        arrayListB.add(3);
        fullList.add(1);
        fullList.add(2);
        fullList.add(3);
        falseList.add("false");
        assertEquals(calculator.union(arrayListA, arrayListB), fullList);
        assertEquals(calculator.intersection(arrayListA, arrayListB), emptyList);
        assertEquals(calculator.difference(arrayListA, arrayListB), arrayListA);
        assertEquals(calculator.symDifference(arrayListA, arrayListB), fullList);
        assertEquals(calculator.isSubset(arrayListA, arrayListB), falseList);
        assertEquals(calculator.isSuperset(arrayListA, arrayListB), falseList);
    }

    @Test
    public void TestLinkedList() throws IOException {
        ArrayList<Object> arrayListA = new ArrayList<>();
        ArrayList<Object> arrayListB = new ArrayList<>();
        int[] emptyList = {};
        ArrayList<Object> fullList = new ArrayList<>();
        ArrayList<Object> falseList = new ArrayList<>();
        SetCalculator calculator = new SetCalculator();
        arrayListA.add(1);
        arrayListA.add(2);
        arrayListB.add(3);
        fullList.add(1);
        fullList.add(2);
        fullList.add(3);
        falseList.add("false");
        LinkedList factory = new LinkedList();
        assertEquals(factory.build(Operator.UNION, arrayListA, arrayListB).getSize(), 3);
        assertEquals(factory.build(Operator.INTERSECTION, arrayListA, arrayListB).getSize(),3);
        assertEquals(factory.build(Operator.DIFFERENCE, arrayListA, arrayListB).getSize(),3);
        assertEquals(factory.build(Operator.SYMMETRIC_DIFFERENCE, arrayListA, arrayListB).getSize(),3);
        assertEquals(factory.build(Operator.IS_SUBSET, arrayListA, arrayListB).getSize(),3);
        assertEquals(factory.build(Operator.IS_SUPERSET, arrayListA, arrayListB).getSize(),3);
        // default case cannot be attained with the given operator class


    }
}
